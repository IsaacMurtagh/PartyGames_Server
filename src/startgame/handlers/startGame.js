const { 
  connectionsTable, 
  gamesTable, 
  SocketManager, 
} = require('../layerDeps');


async function startGame(event) {
  const connectionId = event.requestContext.connectionId
  const connection = await connectionsTable.getConnectionByConnectionId(connectionId);

  if (!connection) {
    throw new Error('Invalid connection');
  }

  const [ game, connections ] = await Promise.all([
    gamesTable.getGameById(connection.gameId),
    connectionsTable.getAllConnectionsForGame(connection.gameId),
  ]);
  game.status = 'inprogress';

  const socketManager = new SocketManager(event.requestContext);
  await Promise.all([
    socketManager.postToAllConnections({ 
      connections, 
      data: game.toApiResponse(),
      message: 'GAME_STARTED',
    }),
    gamesTable.createGame(game)
  ]);

  return game;
}

module.exports = {
  handler: startGame,
}