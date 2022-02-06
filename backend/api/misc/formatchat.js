/**
 * @author G0x209C
 * @params player, message
 * @description formats the input into a chatformat
 * @return JSON{name,isHost,message}
 */

module.exports = function formatchat(player, message){
  return {name: player.name, isHost: player.isHost, message: message};
};
