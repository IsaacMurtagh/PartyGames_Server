const gamesTable = require('../gamesTable');
const Game = require('../models/Game');

async function createGame(event, context) {
  const game = Game.fromCreate(JSON.parse(event.body));
  await gamesTable.createGame(game);
  return game.toApiResponse();
};

module.exports = {
  handler: createGame,
  validation: 'hello boss',
};