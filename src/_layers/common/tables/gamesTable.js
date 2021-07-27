const dbClient = require('../dbClient');
const Game = require('../models/Game');
const Participant = require('../models/Participant');
const Round = require('../models/Round');
const GameSummary = require('../models/GameSummary');
class GamesTable {
  constructor() {
    this.name = process.env.GAMES_TABLE_NAME;
  }

  async create(doc) {
    return dbClient.put({
      TableName: this.name,
      Item: doc.toDocument(),
    }).promise()
    .then(() => {
      return doc;
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

  async getParticipant({ userId, gameId }) {
    return dbClient.get({
      TableName: this.name,
      Key: { 
        pk: `Game#${gameId}`,
        sk: `Participant#${userId}`,
      }
    }).promise()
    .then(result => {
      return result.Item ? Participant.fromDocument(result.Item) : undefined;
    });
  }

  async getAllParticipants(gameId) {
    return dbClient.query({
      TableName: this.name,
      ExpressionAttributeValues: {
        ':pk': `Game#${gameId}`,
        ':sk': 'Participant#'
      },
      KeyConditionExpression: 'pk = :pk AND begins_with(sk, :sk)'
    }).promise()
    .then(result => {
      return result.Items ? result.Items.map(item => Participant.fromDocument(item)) : [];
    });
  }

  async getGameRound({ gameId, roundNumber }) {
    return dbClient.get({
      TableName: this.name,
      Key: { 
        pk: `Game#${gameId}`,
        sk: `Round#${roundNumber}`,
      }
    }).promise()
    .then(result => {
      return result.Item ? Round.fromDocument(result.Item) : undefined;
    });
  }

  async makeChoiceForRound({ round, choiceId }) {
    return dbClient.get({
      TableName: this.name,
      Key: { 
        pk: `Game#${round.gameId}`,
        sk: `Round#${round.roundNumber}#`,
      }
    }).promise()
    .then(result => {
      return result.Item ? Round.fromDocument(result.Item) : undefined;
    });
  }

  async getGameSummary(gameId) {
    return dbClient.query({
      TableName: this.name,
      ExpressionAttributeValues: {
        ':pk': `Game#${gameId}`,
        ':sk': 'Round#'
      },
      KeyConditionExpression: 'pk = :pk AND begins_with(sk, :sk)'
    }).promise()
    .then(result => {
      return result.Items ? GameSummary.fromDocuments(result.Items) : undefined;
    });
  }
}
const gamesTable = new GamesTable();
module.exports = gamesTable;