'use strict';
const moment = require('moment');
const { aliasGenerator } = require('../utils/randomGenerator');

class Participant {

  constructor(props) {
    this.userId = props.userId;
    this.id = props.gameId;
    this.joinedAt = props.joinedAt;
    this.updatedAt = props.updatedAt;
    this.displayName = props.displayName;
    this.creator = props.creator;
    this.alias = props.alias;
  }

  static fromCreate(props) {
    return new Participant({
      ...props,
      alias: aliasGenerator(),
      creator: true,
      joinedAt: moment(),
      updatedAt: moment(),
    })
  }

  static fromJoin(props) {
    return new Participant({
      ...props,
      alias: aliasGenerator(),
      creator: false,
      joinedAt: moment(),
      updatedAt: moment(),
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
      pk: `Game#${this.id}`,
      sk: `Participant#${this.userId}`,
      joinedAt: this.joinedAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    }
  }

  toApiResponse() {
    return {
      displayName: this.displayName,
      creator: this.creator,
      alias: this.alias,
      joinedAt: this.joinedAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    }
  }
}

module.exports = Participant;