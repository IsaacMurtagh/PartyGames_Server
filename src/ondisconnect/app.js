require('aws-sdk');
function badConnection(reason='') {
  return { statusCode: 500, body: `Failed to connect: ${reason}` }
}

exports.handler = async event => {
  try {
    const { connectionsTable, SocketManager } = require('./layerDeps');
  
    const connectionId = event.requestContext.connectionId
    const connection = await connectionsTable.getConnectionByConnectionId(connectionId);

    if (!connection) {
      return badConnection(`Connection Id: ${connectionId}`);
    }

    await connectionsTable.deleteConnection(connection);
    const connections = await connectionsTable.getAllConnectionsForGame(connection.gameId);
    const socketManager = new SocketManager(event.requestContext);
    await socketManager.postToAllConnections({ connections, data: 'Someone has left' });  
  
    return { statusCode: 200, body: JSON.stringify(connection.toApiResponse()) };
  } catch (err) {
    console.log(err);
    return badConnection(err.stack);
  }
};
