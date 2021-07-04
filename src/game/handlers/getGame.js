const gamesTable = require('../tables/gamesTable');

async function getGame(event, context) {
  const { id } = event.pathParameters;
  const game = await gamesTable.getGameById(id);
  return game.toApiResponse();
};

module.exports = {
  handler: getGame,
  validation: 'hello boss',
};