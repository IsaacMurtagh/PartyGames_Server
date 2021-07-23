require('aws-sdk');
const createError = require('http-errors');
const { 
  connectionsTable, 
  SocketManager, 
  handleGracefully, 
  gamesTable,
} = require('./layerDeps');

exports.handler = async event => {
  try {
  
    const connectionId = event.requestContext.connectionId
    const connection = await connectionsTable.getConnectionByConnectionId(connectionId);

    if (!connection) {
      return handleGracefully({ statusCode: 200, body: { message: 'Connection already terminated' } });
    }
    const participant = await gamesTable.getParticipant(connection);
    participant.active = false;
    await gamesTable.createParticipant(connection);

    await connectionsTable.deleteConnection(connection);
    const connections = await connectionsTable.getAllConnectionsForGame(connection.gameId);

    const socketManager = new SocketManager(event.requestContext);
    await socketManager.postToAllConnections({ 
      connections, 
      data: participant.toApiResponse(),
      message: 'PLAYER_LEFT',
    });  
  
    return handleGracefully({ statusCode: 200, body: connection.toApiResponse() });
  } catch(err) {
    if (err.statusCode) {
      const { statusCode, message } = err;
      return handleGracefully({ body: { message }, statusCode });
    }
    console.error(err);
    return { statusCode: 500, body: 'Something went wrong' }
  }
};