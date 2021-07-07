const { 
  gamesTable,
  usersTable,
  Participant, 
} = require('../layerDeps');

async function joinGame(event, context) {
  const { userId } = JSON.parse(event.body);
  const { gameId } = event.pathParameters;

  const user = await usersTable.getUserById(userId);
  if (!user) {
    return createError.Forbidden('INVALID_USER_ID');
  }

  const game = await gamesTable.getGameById(gameId);
  if (!game) {
    return createError.Forbidden('INVALID_GAME_ID');
  }

  const participant = Participant.fromJoin({ userId, gameId });
  await gamesTable.createParticipant(participant);

  return {
    game: game.toApiResponse(),
    self: participant.toApiResponse(),
  }
};

module.exports = {
  handler: joinGame,
  validation: 'hello boss',
};