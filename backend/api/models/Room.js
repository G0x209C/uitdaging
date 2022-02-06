const formatscoreboard = require('../misc/formatscoreboard');
const formatchat = require('../misc/formatchat');
module.exports = {
  attributes: {
    code: {type: 'string', unique: true, required: true},
    players: {collection: 'player', via: 'room'},
    messages: {collection: 'message', via: 'room'},
    activeGame: {model: 'game'},
  },
  /**
   * @author G0x209C
   * @param roomId
   * @description retrieves messages from the room
   * @returns array[formatchat]
   */
  getMessages: async (roomId) => {
    return await Message.find({room: roomId}).populate('player')
      .then(messages => {
        let result = [];
        if(messages.length){
          for (let i = 0; i < messages.length; i++) {
            result.push(formatchat(messages[i].player, messages[i].message));
          }
        }
        return result.reverse();
      }).catch(err => {
        throw err;
      });
  },
  /**
   * @author G0x209C
   * @param roomId
   * @description returns a json object of player{name, isHost, score}
   * @returns array[formatscoreboard]
   */
  getScoreboard: async (roomId) => {
    return await Room.findOne({id: roomId}).populate('players').then(room => {
      let result = [];
      for (let i = 0; i < room.players.length; i++) {
        result.push(formatscoreboard(room.players[i]));
      }
      return result;
    }).catch(err => {
      throw err;
    });
  },
  /**
   * @author G0x209C
   * @param code
   * @description checks if room with a certain code already exists
   * @returns boolean
   */
  checkRoomExists: async (code) => {
    return (await Room.count({code: code}) === 1);
  },
  /**
   * @author G0x209C
   * @param roomId
   * @description Counts the members in room
   * @returns number
   */
  memberCount: async (roomId) => {
    return await Room.findOne({id:roomId}).populate('players')
      .then(room=>{
        return room.players.length;
      })
      .catch(err=>{throw err;});
  },
};
