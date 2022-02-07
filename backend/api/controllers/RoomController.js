/**
 * RoomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  /**
   * @author G0x209C
   * @param secret
   * @description joins socket to room
   */
  joinSocketRoom: {
    friendlyName: 'Join room socket',


    description: 'Joins incoming socket to room',


    inputs: {
      secret: {type: 'string', required: false},
    },


    exits: {},


    fn: async function (inputs, exits, env) {

      if (!env.req.isSocket) {
        throw {badRequest: 'Conenction is not a socket'};
      }


      if (inputs.secret) {
        let player = await Player.findOne({secret: inputs.secret}).populate('room')
          .catch(err => {
            throw err;
          });
        if (player) {
          sails.sockets.join(env.req, player.room.code);
          return env.res.json({
            success: true,
            message: 'successfully joined room'
          });
        } else {
          return env.res.json({
            success: false,
            message: 'Could not find user'
          });
        }


      } else {
        return env.res.json({
          success: false,
          message: 'lacking identifier',
        });


        // All done.

      }


    }
  },
  /**
   * @author G0x209C
   * @param secret
   * @description removes socket from room
   */
  leaveSocketRoom: {
    friendlyName: 'Leave room socket',


    description: 'Leaves incoming socket from room',


    inputs: {
      secret: {type: 'string', required: false},
    },


    exits: {},


    fn: async function (inputs, exits, env) {

      if (!env.req.isSocket) {
        throw {badRequest: 'Conenction is not a socket'};
      }


      if (inputs.secret) {
        let player = await Player.findOne({secret: inputs.secret}).populate('room')
          .catch(err => {
            throw err;
          });
        sails.sockets.leave(env.req, player.room.code);
        return env.res.json({
          success: true,
          message: 'successfully joined room'
        });
      } else {
        return env.res.json({
          success: false,
          message: 'lacking identifier',
        });


        // All done.

      }


    },
  },
  /**
   * @author G0x209C
   * @param secret, gameId
   * @description sets the active game for the host's room
   * @returns socketbroadcast('game')
   *
   * Because we provide a record-id, we must get the datastore to check if we are dealing with mongo or mysql
   * If we are dealing with mysql, turn the gameId to number.
   */
  setGame: {
    friendlyName: 'Set the active game',


    description: 'Sets the active game for the room.',


    inputs: {
      secret: {type: 'string', required: false},
      gameId: {type: 'string', required: true}
    },


    exits: {
      roomNotFound: {
        success:false,
        message:'No room was found for the player, logout (this session is invalid)'
      },
      playerNotFound:{
        success: false,
        message: 'Player was not found in database, logout (this session is invalid)'
      },
      playerNotHost:{
        success: false,
        message: 'It seems you are not the host of this lobby.'
      },
      lackingIdentifier: {
        success:false,
        message:'Lacking identifier'
      }
    },


    fn: async function (inputs, exits, env) {

      if(!env.req.isSocket){
        throw {badRequest: 'Connection is not a socket'};
      }

      if(inputs.secret){
        let gameid;
        let datastore = sails.getDatastore();
        switch(datastore.config.adapter){
          case 'sails-mysql':
            gameid = parseInt(inputs.gameId);
            break;
          case 'sails-mongo':
            gameid = inputs.gameId;
            break;
        }

        // check if game id is filled
        if(gameid){
          // get the player to check for host and get the room code;
          let player = await Player.findOne({secret:inputs.secret}).catch(err=>{throw err;});
          let roomcode = await Player.getRoomCode(player.id);
          if(player){
            if(roomcode){
              if(!player.isHost){ // if player is not host, return custom error message
                return env.res.json({success: false,
                  message: 'It seems you are not the host of this lobby.'});
              }

              let game = await Game.findOne({id:gameid}).catch(err=>{throw err;});

              if(!game){ // game not found, should not happen, return serverError
                return env.res.serverError('Game was not found, contact the developer at ');
              }

              console.log(roomcode);
              console.log(game);
              await sails.sockets.broadcast(roomcode, 'startgame', game);

            }else{ // player was not associated to room, return custom error message
              return env.res.json({success:false,
                message:'No room was found for the player, logout (this session is invalid)'});
            }
          }else{ // player was not found in database, return custom error message
            return env.res.json({success: false,
              message: 'Player was not found in database, logout (this session is invalid)'});
          }
        }
      }else{ // inputs.secret was not provided, return custom error message
        return env.res.json({success:false,
          message:'Lacking identifier, logout of application'});
      }

    }


  },
};

