'use strict';
const moment = require('moment');

class Connection {

  constructor(props) {
    this.connectionId = props.connectionId;
    this.userId = props.userId;
    this.gameId = props.gameId;
    this.createdAt = props.createdAt;
  }

  static fromCreate(props) {
    return new Connection({
      ...props,
      createdAt: moment(),
    })
  }

  static fromDocument(doc) {
    return new Connection({
      ...doc,
      createdAt: moment(doc.createdAt),
    })
  }

  toDocument() {
    return {
      ...this,
      pk: `Game#${this.gameId}`,
      sk: `User#${this.userId}`,
      gameId: this.gameId,
      userId: this.userId,
      connectionId: this.connectionId,
      createdAt: this.createdAt.toISOString(),
    }
  }

  toApiResponse() {
    return {
      ...this,
      createdAt: this.createdAt.toISOString(),
    }
  }

}

module.exports = Connection;