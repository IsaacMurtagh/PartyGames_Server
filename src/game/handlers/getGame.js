const gamesTable = require('../gamesTable');

async function getGame(event, context) {
  const { id } = event.pathParameters;
  return await gamesTable.getGameById(id);
};

module.exports = {
  handler: getGame,
  validation: 'hello boss',
};