const dynamoDb = require('../dbClient');
const Game = require('../models/Game');
class GamesTable {
  constructor() {
    this.name = process.env.GAMES_TABLE_NAME || 'Users';
  }

  async createGame(game) {
    return dynamoDb.put({
      TableName: this.name,
      Item: game.toDocument(),
    }).promise()
    .then(() => {
      return game;
    });
  }

  async getGameById(id) {
    return dynamoDb.get({
      TableName: this.name,
      Key: { 
        pk: `Game#${id}`,
        sk: '#UniqueConstraint',
      }
    }).promise()
    .then(result => {
      return result.Item ? Game.fromDocument(result.Item) : undefined;
    });
  }
}
const gamesTable = new GamesTable();
module.exports = gamesTable;