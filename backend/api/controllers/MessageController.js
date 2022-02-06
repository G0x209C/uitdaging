/**
 * MessageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  /**
   * @author G0x209C
   * @params secret, message
   * @description retrieves user and sensds message to user's room via model-method Player.say()
   */
  sendMessage: {
    friendlyName: 'Send message',


    description: 'Sends message to room and adds it to database',


    inputs: {
      secret: {type: 'string', required: false},
      message: {type: 'string', required: true}
    },


    exits: {},


    fn: async function (inputs, exits, env) {
      if (!env.req.isSocket) {
        throw {badRequest: 'Not a socket'};
      }


      if (inputs.secret) {
        // retrieve player
        await Player.findOne({secret: inputs.secret})
          .then(async (player) => {
            // with retrieved player, say something.
            await Player.say(player.id, inputs.message, env.req);
          })
          .catch(err => {
            throw err;
          });
        return env.res.json(
          {
            success:true,
            message: 'message send successfully'
          }
        );
      } else {
        return env.res.json({
          success: false,
          message: 'lacking identifier',
        });
      }


    }

  },

  /**
   * @param secret
   * @description Retrieves the messages from the database.
   *
   * Not used by Vue-frontend.
   */
  getMessages: {
    friendlyName: 'Get Messages',


    description: 'Retrieves messages from database',


    inputs: {
      secret: {type: 'string', required: true}
    },


    exits: {},


    fn: async function (inputs, exits, env) {
      let secret;


      if (inputs.secret) {
        let player = await Player.findOne({secret: inputs.secret}).populate('room').catch(err => {
          throw err;
        });
        if (player) {
          return env.res.json(await Room.getMessages(player.room.id));
        } else {
          return env.res.serverError('Could not find player'); // TODO: replace with JSON response;
          //return env.res.json({});
        }
      } else {
        return env.res.serverError('Lacking identifier'); //TODO: replace with JSON return.
      }
    }

  }
};

