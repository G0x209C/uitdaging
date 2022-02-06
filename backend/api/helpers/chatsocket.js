module.exports = {


  friendlyName: 'Chathelper',


  description: 'Chathelper to help with sending chats.',


  inputs: {
    code: {type:'string', required:true},
    message: {type:'json', required: true}
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  // send message to sockets in room.
  fn: async function (inputs) {
      await sails.sockets.broadcast(inputs.code, 'newmessage', inputs.message);
  }


};

