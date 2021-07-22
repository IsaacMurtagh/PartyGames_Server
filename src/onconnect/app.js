require('aws-sdk');
const createError = require('http-errors');
const { 
  connectionsTable, 
  Connection, 
  SocketManager, 
  handleGracefully, 
  usersTable,
  Participant,
  gamesTable,
} = require('./layerDeps');

exports.handler = async event => {
  try {
    const connectionId = event.requestContext.connectionId
    const { userId, gameId, name } = event.queryStringParameters;
    if (!userId || !gameId) throw createError.BadRequest('userId and gameId are required query string parameters');

    const user = await usersTable.getUserById(userId);
    if (!user) throw createError.Forbidden('INVALID_USER_ID');
  
    const connections = await connectionsTable.getAllConnectionsForGame(gameId);
    const connection = Connection.fromCreate({ connectionId, userId, gameId });
    try {
      await connectionsTable.createConnection(connection);
    } catch {
      throw createError.Forbidden('CONNECTION_ALREADY_ESTABLISHED');
    }

    const participant = Participant.fromCreate({ userId, gameId, alias: user.alias, name });
    await gamesTable.createParticipant(participant);

    const socketManager = new SocketManager(event.requestContext);
    await socketManager.postToAllConnections({ 
      connections, 
      data: participant.toApiResponse(), 
      message: 'PLAYER_JOINED',
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
