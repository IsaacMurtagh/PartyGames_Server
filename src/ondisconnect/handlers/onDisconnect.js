const { 
  connectionsTable, 
  SocketManager, 
  gamesTable,
} = require('../layerDeps');


async function onDisconnect(event) {
  const connectionId = event.requestContext.connectionId
  const connection = await connectionsTable.getConnectionByConnectionId(connectionId);

  if (!connection) {
    return { message: 'Connection already terminated' };
  }
  const participant = await gamesTable.getParticipant(connection);
  participant.active = false;
  await gamesTable.createParticipant(connection);

  await connectionsTable.deleteConnection(connection);
  const connections = await connectionsTable.getAllConnectionsForGame(connection.gameId);

  const socketManager = new SocketManager(event.requestContext);
  await socketManager.postToAllConnections({ 
    connections, 
    data: { alias: participant.alias },
    message: 'PLAYER_LEFT',
  });  

  return connection.toApiResponse();
}

module.exports = {
  handler: onDisconnect,
}