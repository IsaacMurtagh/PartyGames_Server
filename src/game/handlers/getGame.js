const { gamesTable } = require('../layerDeps');
const createError = require('http-errors')

async function getGame(event, context) {
  const { gameId } = event.pathParameters;
  const game = await gamesTable.getGameById(gameId);
  if (!game) {
    throw createError.Forbidden('INVALID_GAME_ID');
  }

  game.participants = await gamesTable.getAllParticipants(gameId);
  if (game.isFinished) {
    game.summary = await gamesTable.getGameSummary(gameId)
  }
  return game.toApiResponse();
};

module.exports = {
  handler: getGame,
};