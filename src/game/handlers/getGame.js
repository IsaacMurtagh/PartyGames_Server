const { gamesTable } = require('../layerDeps');
const createError = require('http-errors')

async function getGame(event, context) {
  const { gameId } = event.pathParameters;
  const game = await gamesTable.getGameById(gameId);
  if (!game) {
    return createError.Forbidden('INVALID_GAME_ID');
  }
  return game.toApiResponse();
};

module.exports = {
  handler: getGame,
  validation: 'hello boss',
};