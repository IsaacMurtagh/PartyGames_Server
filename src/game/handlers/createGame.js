const {
  gamesTable,
  usersTable,
  Game,
} = require('../layerDeps');
const createError = require('http-errors');
const Joi = require('joi');

async function createGame(event, context) {
  const { userId, type, allowNicknames, name, roundTimeSeconds, numberRounds } = JSON.parse(event.body);

  const creator = await usersTable.getUserById(userId);
  if (!creator) {
    throw createError.Forbidden('INVALID_USER_ID');
  }

  const game = Game.fromCreate({ userId, type, allowNicknames, name, roundTimeSeconds, numberRounds });
  await gamesTable.create(game);
  
  return game.toApiResponse();
};

module.exports = {
  handler: createGame,
  schema: Joi.object({
    name: Joi.string().max(16).required(),
    type: Joi.string().valid('WouldYouRather').required(),
    allowNicknames: Joi.boolean().optional(),
    userId: Joi.string().uuid().required(),
    numberRounds: Joi.number().min(1).max(10).optional(),
    roundTimeSeconds: Joi.number().min(1).max(30).optional(),
  }),
};