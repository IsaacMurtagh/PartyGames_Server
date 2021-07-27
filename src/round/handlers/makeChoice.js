const {
  gamesTable,
  usersTable,
  Answer,
} = require('../layerDeps');
const createError = require('http-errors');
const Joi = require('joi');

async function makeChoice(event, context) {
  const { gameId, roundNumber } = event.pathParameters;
  const { userId, choiceId } = JSON.parse(event.body);

  const [ user, game, round ] = await Promise.all([
    usersTable.getUserById(userId),
    gamesTable.getGameById(gameId),
    gamesTable.getGameRound({ roundNumber, gameId }),
  ]);

  if (!user) throw createError.Forbidden('INVALID_USER_ID');
  if (!game) throw createError.Forbidden('INVALID_GAME_ID');
  if (!game.inProgress) throw createError.Forbidden('GAME_NOT_IN_PROGRESS');
  if (!round) throw createError.Forbidden('INVALID_GAME_ROUND');
  console.log(round);
  if (!round.choices.find(choice => choice.id == choiceId )) {
    throw createError.BadRequest('INVALID_ROUND_CHOICE');
  }

  const userAnswer = Answer.fromCreate({
    gameId,
    choiceId,
    userId,
    roundNumber: round.roundNumber,
    alias: user.alias,
  })
  await gamesTable.create(userAnswer);
  return userAnswer.toApiResponse();
};

module.exports = {
  handler: makeChoice,
  schema: Joi.object({
    userId: Joi.string().uuid().required(),
    choiceId: Joi.number().min(0).required(),
  }),
};