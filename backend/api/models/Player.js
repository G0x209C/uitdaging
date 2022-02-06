const {v4} = require('uuid');
module.exports={
  attributes:{
    secret: {type:'string', unique:true, required: true},
    name: {type:'string', required:true},
    isHost: {type:'boolean', defaultsTo:false},
    room: {model:'room',},
    messages: {collection:'message', via: 'player'}
  },
  newPlayer: async(name, isHost, roomId)=>{
    let player = await Player.create({secret:v4(), name:name, isHost:isHost, room:roomId}).catch(err=>{throw err;});

    return await Player.findOne({id:player.id}).populateAll().catch(err=>{throw err;});
  },
  /**
   * @params id, msg
   * @description creates message for player and uses helper to broadcast.
   */
  say: async(id, msg)=>{
    let player = await Player.findOne({id:id}).populate('room')
      .catch(err=>{throw err});
    // broadcast message to room.
    await sails.helpers.chatsocket(
      player.room.code, // player's room
      await Message.create({player: player.id, name:player.name, msg:msg, room:player.room.id}).fetch() // create message and pass it to socket-helper.
    );
  }
};
