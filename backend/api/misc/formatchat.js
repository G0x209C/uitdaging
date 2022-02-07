/**
 * @author G0x209C
 * @params player, message
 * @description formats the input into a chatformat
 * @return JSON{name,isHost,message}
 */

module.exports = function formatchat(player, message){
  let playerobj = player;
  return {name: playerobj.name, isHost: playerobj.isHost, message: message};
};
