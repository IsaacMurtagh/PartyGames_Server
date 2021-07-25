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
    this.participants = props.participants;
    this.status = props.status;
  }

  static fromCreate(props) {
    return new Game({
      ...props,
      status: 'new',
      participants: [],
      allowNicknames: props.allowNicknames || true,
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
      participants: this.participants.map(p => p.toApiResponse()),
    }
  }
}

module.exports = Game;