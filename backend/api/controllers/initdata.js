
module.exports = {


  friendlyName: 'Initdata',


  description: 'Initializes the data for the vuex store',


  inputs: {
    secret: {type: 'string', required: false}
  },


  exits: {},

  /**
   * @param secret
   * @description sends initializing data over socket to vue-frontend
   */
  fn: async function (inputs, exits, env) {

    if(!env.req.isSocket){
      throw {badRequest: 'Connection is not socket'};
    }
    // init variables;
    let returnobject;

    // if secret has been set
    if (inputs.secret) {
      // get player and its room
      let player = await Player.findOne({secret: inputs.secret}).populate('room')
        .catch(err => {
          throw err;
        });

      let success = true;
      let messages;
      let scoreboard;

      if(player){
        // get room messages
        messages = await Room.getMessages(player.room.id);

        // get scoreboard
        scoreboard = await Room.getScoreboard(player.room.id);
      }else{
        success = false;
      }

      // get games.
      let games = await Game.find();
      // create an object to return
      returnobject = {
        success: success,
        player: player,
        messages: messages,
        scoreboard: scoreboard,
        games: games,
      };
    } else {
      // nothing could be done, return success false
      returnobject = {
        success: false,
        player: null,
        messages: null,
        scoreboard: null,
        games: null,
      };
    }

    await sails.sockets.broadcast(sails.sockets.getId(env.req), 'initdata', returnobject);

  }


};
