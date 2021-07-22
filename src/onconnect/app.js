require('aws-sdk');
const createError = require('http-errors');
const { connectionsTable, Connection, SocketManager, handleGracefully } = require('./layerDeps');

exports.handler = async event => {
  try {
    const connectionId = event.requestContext.connectionId
    const { userId, gameId } = event.queryStringParameters;
    if (!userId || !gameId) {
      throw createError.BadRequest('userId and gameId are required query string parameters');
    }
  
    const connections = await connectionsTable.getAllConnectionsForGame(gameId);

    const connection = Connection.fromCreate({ connectionId, userId, gameId });
    try {
      await connectionsTable.createConnection(connection);
    } catch {
      throw createError.Forbidden('CONNECTION_ALREADY_ESTABLISHED');
    }

    const socketManager = new SocketManager(event.requestContext);
    await socketManager.postToAllConnections({ connections, data: 'Someone has joined!'});  
  
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
