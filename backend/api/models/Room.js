module.exports={
  attributes:{
    code: {type:'string', unique:true, required:true},
    players:{collection: 'player', via:'room'},
    messages:{collection: 'message', via:'room'},
    activeGame: {model:'game'},
  },
  /**
   * @param roomId
   * @description retrieves messages from the room
   * @returns array[messageObj]
   */
  getMessages: async(roomId)=>{
    return await Room.findOne({id:roomId}).populate('messages')
      .then(room=>{
        return room.messages;
      })
      .catch(err=>{throw err;});
  },
  /**
   * @param roomId
   * @description returns a json object of player{name, isHost, score}
   * @returns array[playerObj(name, isHost, score)]
   */
  getScoreboard: async(roomId)=>{
    return await Room.findOne({id:roomId}).then(room=>{
      let result = [];
      for(let i=0; i<room.players.length; i++){
        result.push(
          {
            name: room.players[i].name,
            isHost: room.players[i].isHost,
            score: room.players[i].score
          }
        );
      }
      return result;
    }).catch(err=>{throw err});
  },
  /**
   * @param code
   * @description checks if room with a certain code already exists
   * @returns boolean
   */
  checkRoomExists: async(code)=>{
    return (await Room.count({code:code})===1);
  },
};
