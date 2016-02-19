/**
 * Created by Justin on 2016-02-19.
 */
const settingsByPlayerCount = {
  // TEST
  2: { numOfSpies: 1, rounds: [1,1,1,1,1], fails: [1,1,1,1,2] },

  5: { numOfSpies: 2, rounds: [2,3,2,3,3], fails: [1,1,1,1,1] },
  6: { numOfSpies: 2, rounds: [2,3,4,3,4], fails: [1,1,1,1,1] },
  7: { numOfSpies: 3, rounds: [2,3,3,4,4], fails: [1,1,1,2,1] },
  8: { numOfSpies: 3, rounds: [3,4,4,5,5], fails: [1,1,1,2,1] },
  9: { numOfSpies: 3, rounds: [3,4,4,5,5], fails: [1,1,1,2,1] },
 10: { numOfSpies: 4, rounds: [3,4,4,5,5], fails: [1,1,1,2,1] },
};

module.exports = function getSettingsFor(playerCount) {
  return settingsByPlayerCount[playerCount] || null;
};

module.exports.MAX_PLAYERS = 10;
