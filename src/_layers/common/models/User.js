'use strict';
const moment = require('moment');
const uuid = require('uuid');

class User {

  constructor(props) {
    this.id = props.id;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.games = props.games;
  }

  static fromCreate(props = {}) {
    return new User({
      id: uuid(),
      createdAt: moment(),
      updatedAt: moment(),
      games: [],
    })
  }

  static fromDocument(doc) {
    return new User({
      ...doc,
      createdAt: moment(doc.createdAt),
      updatedAt: moment(doc.updatedAt),
    })
  }

  toDocument() {
    return {
      pk: `User#${this.id}`,
      sk: '#UniqueConstraint',
      id: this.id,
      games: this.games,
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

module.exports = User;