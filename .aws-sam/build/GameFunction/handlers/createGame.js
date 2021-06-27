const gamesTable = require('../gamesTable');
const Game = require('../models/Game');

async function createGame(event, context) {
  const game = Game.fromCreate({});
  await gamesTable.createGame(game);
  return game.toApiResponse();
};

module.exports = {
  handler: createGame,
  validation: 'hello boss',
};