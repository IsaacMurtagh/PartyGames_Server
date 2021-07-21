'use strict';
const moment = require('moment');
const uuid = require('uuid');

class User {

  constructor(props) {
    this.id = props.id;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static fromCreate() {
    return new User({
      id: uuid(),
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