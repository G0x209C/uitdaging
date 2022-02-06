/**
 * @author G0x209C
 * @param player
 * @desciption formats the passed playerObject into a scoreboard format.
 * @return Object[scoreboardformat]
 */

module.exports = function formatscoreboard(player) {
  return {name: player.name, isHost: player.isHost, score: player.score};
};


