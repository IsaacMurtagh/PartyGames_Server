require('aws-sdk');
const { connectionsTable, Connection } = require('./layerDeps');

function badConnection(reason='') {
  return { statusCode: 500, body: `Failed to connect: ${reason}` }
}

exports.handler = async event => {
  const connectionId = event.requestContext.connectionId
  const { userId, gameId } = event.queryStringParameters;
  if (!userId || !gameId) {
    return badConnection('userId and gameId query params are required');
  }

  const connection = Connection.fromCreate({ connectionId, userId, gameId });
  try {
    await connectionsTable.createConnection(connection);
  } catch (err) {
    return badConnection();
  }

  return { statusCode: 200, body: JSON.stringify(connection.toApiResponse()) };
};
