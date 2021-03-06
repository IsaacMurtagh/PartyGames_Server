const AWS = require('aws-sdk');

class SocketManager {

  constructor(requestContent) {
    const { domainName, stage } = requestContent;
    this.client = new AWS.ApiGatewayManagementApi({
      apiVersion: '2018-11-29',
      endpoint: `${domainName}/${stage}`,
    });
  }

  async postToAllConnections({ connections, data, message }) {
    const Data = JSON.stringify({ data, message });
    await Promise.allSettled(connections.map(({ connectionId }) => {
      return this.client.postToConnection({ ConnectionId: connectionId, Data }).promise();
    }));
  }
}

module.exports = SocketManager;