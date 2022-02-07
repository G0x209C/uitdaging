/**
 * PlayerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const formatscoreboard = require('../misc/formatscoreboard');

module.exports = {

  /**
   * @author G0x209C
   * @params name, code (optional)
   * @description registers a new player to the database
   * @returns JSON{success, message, player}
   */
  registerPlayer:{

    friendlyName: 'Register Player',


    description: 'Registers the player',


    inputs: {
      name: {type:'string', required: true},
      code: {type:'string', required: false}
    },


    exits: {

    },


    fn: async function (inputs,exits,env) {

      if(!env.req.isSocket){
        throw {badRequest:'Connection is not a socket'};
      }

      let player;
      // search for room and register a new user to it.
      if(inputs.code){
        // check if room exists; Type bool
        let room = await Room.checkRoomExists(inputs.code);
        if(room) {
          // replace bool with instance of room.
          room = await Room.findOne({code: inputs.code}).catch(err => {
            throw err;
          });
          // check how many members are already assigned to room
          if ((await Room.memberCount(room.id)) < 6) {
            // create player
            player = await Player.newPlayer(inputs.name, false, room.id);

            // if player joins existing room, broadcast new user to room.
            await sails.sockets.broadcast(player.room.code, 'newplayer', formatscoreboard(player), env.req);
          }
          else { // more than 6 players is not allowed, return room full to client
            return env.res.json({success:false, message: 'Room full', secret:null});
          }
        }else{ // room does not exist.
          return env.res.json({success:false, message: 'Room does not exist', secret:null});
        }
      }else{
        // create a new room and add the new user to it as host;
        let code = await sails.helpers.gencode();
        // if room already exists: generate a new code.
        while(await Room.checkRoomExists(code)){
          code = await sails.helpers.gencode();
        }
        // create a room and return it
        let room = await Room.create({code:code}).fetch().catch(err=>{throw err;});
        // using the newly created room: create a new user and add room.id to the room(fk) field.
        player = await Player.newPlayer(inputs.name, true, room.id);
      }

      // no errors occured, return success message with secret.
      return env.res.json({success:true, message: 'Player created', secret:player.secret});

    }

  },

  /**
   * @author G0x209C
   * @param secret
   * @description logs user out and archives the player record.
   * Broadcasts to other players that player has left.
   */
  logout:{

    friendlyName: 'Log out user',


    description: 'Logs the user out, calls updaters, archives the player',


    inputs: {
      secret: {type:'string', required:false}
    },


    exits: {

    },


    fn: async function (inputs, exits, env) {



      if(!env.req.isSocket){
        throw {badRequest: 'Connection is not socket'};
      }


      if(inputs.secret){
        await Player.findOne({secret:inputs.secret}).populate('room').then(async(player)=>{
          if(player.isHost){
            // TODO: IF PLAYER IS HOST, LOG EVERY USER OUT. ROOM IS ENDED, ARCHIVE EVERYTHING.
          }else {
            // broadcast to room that player is leaving.
            await sails.sockets.broadcast(player.room.code, 'newmessage',
              {name: 'server', isHost: false, message: `Player ${player.name} left`},
              env.req
            );
            // broadcast to room that player is to be removed
            await sails.sockets.broadcast(player.room.code, 'removeplayer', formatscoreboard(player), env.req);
          }
        })
          .catch(err=>{throw err;});
        //archive the player.
        await Player.archive({secret:inputs.secret});
      }else{
        return env.res.serverError('Lacking identifier'); //TODO: replace with json response
      }
      // All done.
    }


  }
};

