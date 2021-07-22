'use strict';
const moment = require('moment');
const { aliasGenerator } = require('../utils/randomGenerator');

class Participant {

  constructor(props) {
    this.userId = props.userId;
    this.alias = props.alias;
    this.gameId = props.gameId;
    this.joinedAt = props.joinedAt;
    this.updatedAt = props.updatedAt;
    this.displayName = props.displayName;
    this.active = props.active;
  }

  static fromCreate({ userId, gameId, alias, displayName }) {
    return new Participant({
      userId,
      gameId,
      alias,
      displayName,
      joinedAt: moment(),
      updatedAt: moment(),
      active: true,
    })
  }

  static fromDocument(doc) {
    return new Participant({
      ...doc,
      joinedAt: moment(doc.joinedAt),
      updatedAt: moment(doc.updatedAt),
    })
  }

  toDocument() {
    return {
      ...this,
      pk: `Game#${this.gameId}`,
      sk: `Participant#${this.userId}`,
      joinedAt: this.joinedAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    }
  }

  toApiResponse() {
    return {
      displayName: this.displayName,
      alias: this.alias,
    }
  }
}

module.exports = Participant;