require('aws-sdk');
const { connectionsTable } = require('./layerDeps');

exports.handler = async event => {
  const connectionId = event.requestContext.connectionId
  try {
    const connection = await connectionsTable.getConnectionByConnectionId(connectionId);
    await connectionsTable.deleteConnection(connection);
  } catch (err) {
    return { statusCode: 200, body: 'Connection does not exist.' + err };
  }
  return { statusCode: 200, body: 'Disconnected.' };
};
