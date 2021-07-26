const moment = require('moment');

class Answer {

  constructor(props) {
    this.gameId = props.gameId;
    this.userId = props.userId;
    this.alias = props.alias
    this.roundNumber = props.roundNumber;
    this.choiceId = props.choiceId;
    this.createdAt = props.createdAt;
  }

  static fromCreate(props) {
    return new Answer({
      createdAt: moment(),
      gameId: props.gameId,
      roundNumber: props.roundNumber,
      choiceId: props.choiceId,
      alias: props.alias,
      userId: props.userId
    })
  }

  static fromDocument(doc) {
    return new Round({
      ...doc,
      createdAt: moment(doc.createdAt),
    })
  }

  toDocument() {
    return {
      ...this,
      pk: `Game#${this.gameId}`,
      sk: `Round#${this.roundNumber}#User#${this.userId}`,
      createdAt: this.createdAt.toISOString(),
    }
  }

  toApiResponse() {
    return {
      ...this,
      userId: undefined
    }
  }
}

module.exports = Answer;