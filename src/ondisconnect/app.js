require('aws-sdk');
const createError = require('http-errors');

exports.handler = async event => {
  try {
    const { connectionsTable, SocketManager, handleGracefully } = require('./layerDeps');
  
    const connectionId = event.requestContext.connectionId
    const connection = await connectionsTable.getConnectionByConnectionId(connectionId);

    if (!connection) {
      return handleGracefully({ statusCode: 200, body: { message: 'Connection already terminated' } });
    }

    await connectionsTable.deleteConnection(connection);
    const connections = await connectionsTable.getAllConnectionsForGame(connection.gameId);
    const socketManager = new SocketManager(event.requestContext);
    await socketManager.postToAllConnections({ connections, data: 'Someone has left' });  
  
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