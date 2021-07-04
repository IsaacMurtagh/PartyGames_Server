const gamesTable = require('../tables/gamesTable');
const usersTable = require('../tables/usersTable');
const createError = require('http-errors')
const Game = require('../models/Game');

async function createGame(event, context) {
  const { userId, type, allowNicknames, maxParticipants, name } = JSON.parse(event.body)
  const creator = await usersTable.getUserById(userId);
  if (!creator) {
    return createError.Forbidden('INVALID_USER_ID');
  }
  const game = Game.fromCreate({ userId, type, allowNicknames, maxParticipants, name });
  await gamesTable.createGame(game);
  return game.toApiResponse();
};

module.exports = {
  handler: createGame,
  validation: 'hello boss',
};