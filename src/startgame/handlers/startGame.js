const { 
  connectionsTable, 
  gamesTable, 
  SocketManager, 
} = require('../layerDeps');
const createError = require('http-errors');

async function startGame(event) {
  const connectionId = event.requestContext.connectionId
  const connection = await connectionsTable.getConnectionByConnectionId(connectionId);

  if (!connection) {
    throw createError.Forbidden('INVALID_CONNECTION');
  }

  const { gameId } = connection;
  const [ game, connections, participants ] = await Promise.all([
    gamesTable.getGameById(gameId),
    connectionsTable.getAllConnectionsForGame(gameId),
    gamesTable.getAllParticipants(gameId),
  ]);
  game.participants = participants;

  if (game.status != 'new') {
    throw createError.BadRequest('GAME_ALREADY_STARTED');
  }
  game.status = 'inprogress';

  const socketManager = new SocketManager(event.requestContext);
  await Promise.all([
    socketManager.postToAllConnections({ 
      connections,
      data: game.toApiResponse(),
      message: 'GAME_STARTED',
    }),
    gamesTable.create(game)
  ]);

  return game;
}

module.exports = {
  handler: startGame,
}