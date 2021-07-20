require('aws-sdk');
function badConnection(reason='') {
  return { statusCode: 500, body: `Failed to connect: ${reason}` }
}

exports.handler = async event => {
  try {
    const { connectionsTable, Connection } = require('./layerDeps');
    const SocketManager = require('./SocketManager');
  
    const connectionId = event.requestContext.connectionId
    const { userId, gameId } = event.queryStringParameters;
    if (!userId || !gameId) {
      return badConnection('userId and gameId query params are required');
    }
  
    const connections = await connectionsTable.getAllConnectionsForGame(gameId);
    
    const connection = Connection.fromCreate({ connectionId, userId, gameId });
    await connectionsTable.createConnection(connection);

    const socketManager = new SocketManager(event.requestContext);
    await socketManager.postToAllConnections({ connections, data: 'Someone has joined!'});  
  
    return { statusCode: 200, body: JSON.stringify(connection.toApiResponse()) };
  } catch (err) {
    console.log(err);
    return badConnection(err.stack);
  }
};
