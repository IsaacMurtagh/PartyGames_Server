const dynamoDb = require('../dbClient');
const User = require('../models/User');

class UsersTable {
  constructor() {
    this.name = process.env.USERS_TABLE_NAME || 'Users';
  }

  async createUser(user) {
    return dynamoDb.put({
      TableName: this.name,
      Item: user.toDocument(),
    }).promise()
    .then(() => {
      return user;
    });
  }

  async getUserById(id) {
    return dynamoDb.get({
      TableName: this.name,
      Key: {
        pk: `User#${id}`,
        sk: '#UniqueConstraint',
      }
    }).promise()
    .then(result => {
      return result.Item ? User.fromDocument(result.Item) : undefined;
    });
  }
}
const usersTable = new UsersTable();
module.exports = usersTable;