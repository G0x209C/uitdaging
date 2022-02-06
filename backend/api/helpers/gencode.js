/**
 * @author G0x209C
 * @description generates a random string that can be used as room code.
 */
module.exports = {


  friendlyName: 'Gencode',


  description: 'Generates code for rooms.',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function () {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result=[];
    for(let i=0; i<6; i++){
      result[i] = chars[Math.floor(Math.random()*chars.length)];
    }
    return result.join('');
  }


};

