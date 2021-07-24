const createError = require('http-errors');
const { 
  connectionsTable, 
  Connection, 
  SocketManager, 
  usersTable,
  Participant,
  gamesTable,
} = require('../layerDeps');


async function onConnect(event) {
  const connectionId = event.requestContext.connectionId
  const { userId, gameId, displayName } = event.queryStringParameters;
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

  const participant = Participant.fromCreate({ userId, gameId, alias: user.alias, displayName });
  await gamesTable.createParticipant(participant);

  const socketManager = new SocketManager(event.requestContext);
  await socketManager.postToAllConnections({ 
    connections, 
    data: participant.toApiResponse(), 
    message: 'PLAYER_JOINED',
  });

  return connection.toApiResponse();
}

module.exports = {
  handler: onConnect,
}