const moment = require('moment');
const { choiceGenerator } = require('../utils/randomGenerator');
class Choice {
  constructor(props) {
    this.id = props.id;
    this.description = props.description;
  }

  static generateChoice(id) {
    return new Choice({
      id,
      description: choiceGenerator(),
    });
  }
}

class Round {

  constructor(props) {
    this.gameId = props.gameId;
    this.roundNumber = props.roundNumber;
    this.choices = props.choices;
    this.createdAt = props.createdAt;
  }

  static fromCreate(props) {
    return new Round({
      gameId: props.gameId,
      createdAt: moment(),
      roundNumber: props.roundNumber,
      choices: Array(2).fill(0).map((_, i) => {
        return Choice.generateChoice(i);
      }),
    })
  }

  static fromDocument(doc) {
    return new Round({
      ...doc,
      choices: doc.choices.map(choice => new Choice(choice)),
      createdAt: moment(doc.createdAt),
    })
  }

  toDocument() {
    return {
      ...this,
      pk: `Game#${this.gameId}`,
      sk: `Round#${this.roundNumber}`,
      createdAt: this.createdAt.toISOString(),
    }
  }

  toApiResponse() {
    return {
      ...this,
    }
  }
}
module.exports = Round;