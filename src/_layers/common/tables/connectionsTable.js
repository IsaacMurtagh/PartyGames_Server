const dbClient = require('../dbClient');
const Connection = require('../models/Connection');
const VError = require('verror');

class ConnectionsTable {
  constructor() {
    this.name = process.env.CONNECTIONS_TABLE_NAME;
  }

  async createConnection(connection) {
    return dbClient.put({
      TableName: this.name,
      Item: connection.toDocument(),
      ConditionExpression: 'attribute_not_exists(pk)',
    }).promise()
    .then(() => {
      return connection;
    });
  }

  async getAllConnectionsForGame(gameId) {
    return dbClient.query({
      TableName: this.name,
      ExpressionAttributeValues: {
        ':pk': `Game#${gameId}`,
        ':sk': 'User#'
      },
      KeyConditionExpression: 'pk = :pk AND begins_with(sk, :sk)'
    }).promise()
    .then(result => {
      return result.Items ? result.Items.map(item => Connection.fromDocument(item)) : [];
    });
  }

  async getConnectionByConnectionId(connectionId) {
    return dbClient.query({
      TableName: this.name,
      IndexName: 'connectionId-index',
      ExpressionAttributeValues: {
        ':connectionId': connectionId,
      },
      KeyConditionExpression: 'connectionId = :connectionId',
    }).promise()
    .then((result) => {
      return result.Items.length ? Connection.fromDocument(result.Items[0]) : undefined;
    });
  }

  async deleteConnection(connection) {
    return dbClient.delete({
      TableName: this.name,
      Key: { 
        pk: `Game#${connection.gameId}`,
        sk: `User#${connection.userId}`,
      }
    }).promise()
    .then(() => {
      return connection;
    });
  }
}
const connectionsTable = new ConnectionsTable();
module.exports = connectionsTable;