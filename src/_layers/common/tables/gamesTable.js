const dbClient = require('../dbClient');
const Game = require('../models/Game');
const Participant = require('../models/Participant');
class GamesTable {
  constructor() {
    this.name = process.env.GAMES_TABLE_NAME;
  }

  async createGame(game) {
    return dbClient.put({
      TableName: this.name,
      Item: game.toDocument(),
    }).promise()
    .then(() => {
      return game;
    });
  }

  async getGameById(id) {
    return dbClient.get({
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

  async createParticipant(participant) {
    return dbClient.put({
      TableName: this.name,
      Item: participant.toDocument(),
    }).promise()
    .then(() => {
      return participant;
    });
  }
}
const gamesTable = new GamesTable();
module.exports = gamesTable;