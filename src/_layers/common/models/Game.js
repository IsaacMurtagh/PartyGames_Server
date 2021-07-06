'use strict';
const moment = require('moment');
const uuid = require('uuid');

class Game {

  constructor(props) {
    this.id = props.id;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.name = props.name;
    this.type = props.type;
    this.allowNicknames = props.allowNicknames;
    this.maxPlayers = props.maxPlayers || 5;
  }

  static fromCreate(props) {
    return new Game({
      ...props,
      createdAt: moment(),
      updatedAt: moment(),
      id: uuid(),
    })
  }

  static fromDocument(doc) {
    return new Game({
      ...doc,
      createdAt: moment(doc.createdAt),
      updatedAt: moment(doc.updatedAt),
    })
  }

  toDocument() {
    return {
      ...this,
      pk: `Game#${this.id}`,
      sk: '#UniqueConstraint',
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    }
  }

  toApiResponse() {
    return {
      ...this,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    }
  }
}

module.exports = Game;