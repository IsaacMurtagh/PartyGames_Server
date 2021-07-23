'use strict';
const moment = require('moment');
const uuid = require('uuid');
const { aliasGenerator } = require('../utils/randomGenerator');

class User {

  constructor(props) {
    this.id = props.id;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.alias = props.alias;
  }

  static fromCreate() {
    return new User({
      id: uuid(),
      alias: aliasGenerator(),
      createdAt: moment(),
      updatedAt: moment(),
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
      alias: this.alias,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    }
  }

  toApiResponse() {
    return {
      ...this
    }
  }
}

module.exports = User;