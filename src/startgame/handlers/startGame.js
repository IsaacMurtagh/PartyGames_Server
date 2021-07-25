const { 
  connectionsTable, 
  SocketManager, 
} = require('../layerDeps');


async function startGame(event) {
  const connectionId = event.requestContext.connectionId
  const connection = await connectionsTable.getConnectionByConnectionId(connectionId);

  if (!connection) {
    return { message: 'Connection not found' };
  }

  const connections = await connectionsTable.getAllConnectionsForGame(connection.gameId);

  const socketManager = new SocketManager(event.requestContext);
  await socketManager.postToAllConnections({ 
    connections, 
    data: { gameId: connection.gameId },
    message: 'GAME_STARTED',
  });  

  return connection.toApiResponse();
}

module.exports = {
  handler: startGame,
}