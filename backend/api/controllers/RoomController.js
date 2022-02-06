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
        if(player){
          sails.sockets.join(env.req, player.room.code);
          return env.res.json({
            success: true,
            message: 'successfully joined room'
          });
        }else{
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
      endRoom: {

        friendlyName: 'Exampleaction',


        description: 'Exampleaction something.',


        inputs: {},


        exits: {},


        fn: async function (inputs, exits, env) {

          // All done.
          return;

        }


      }
    }
  }
};

