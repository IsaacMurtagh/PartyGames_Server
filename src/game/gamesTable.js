const dynamoDb = require('./dbClient');

class GamesTable {
  constructor() {
    this.name = process.env.GAMES_TABLE_NAME;
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
      Key: { id }
    }).promise()
    .then(result => {
      return result;
    });
  }
}
gamesTable = new GamesTable();
module.exports = gamesTable;