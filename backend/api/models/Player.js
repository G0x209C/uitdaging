const {v4} = require('uuid');
const formatchat = require('../misc/formatchat');
module.exports={
  attributes:{
    secret: {type:'string', unique:true, required: true},
    name: {type:'string', required:true},
    isHost: {type:'boolean', defaultsTo:false},
    score: {type:'number', defaultsTo: 0},
    room: {model:'room',},
    messages: {collection:'message', via: 'player'}
  },
  /**
   * @author G0x209C
   * @params name, isHost, roomId
   * @description creates new user
   * @returns Player->allAssociations
   */
  newPlayer: async(name, isHost, roomId)=>{
    let player = await Player.create({secret:v4(), name:name, isHost:isHost, room:roomId}).fetch().catch(err=>{throw err;});

    // have to retrieve player again for associations.
    return await Player.findOne({id:player.id}).populateAll().catch(err=>{throw err;});
  },
  /**
   * @author G0x209C
   * @params playerId, msg, req
   * @description creates message for player broadcasts to other players
   */
  say: async(playerId, msg, req)=>{
    // get player
    let player = await Player.findOne({id:playerId}).populate('room')
      .catch(err=>{throw err;});

    // create message with player;
    let message = await Message.create({player: player.id, message:msg, room:player.room.id}).fetch();

    // broadcast message to room using helper.
    let returnObj = formatchat(player, message.message);
    sails.sockets.broadcast(player.room.code, 'newmessage', returnObj, req);
  },
  /**
   * @author G0x209C
   * @param playerId
   * @description get the code of the room linked to the player.
   * @returns player.room.code
   */
  getRoomCode: async(playerId)=>{
    return await Player.findOne({id:playerId}).populate('room')
      .then(player=>{
        return player.room.code;
      })
      .catch(err=>{throw err;});
  }
};
