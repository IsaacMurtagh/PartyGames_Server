'use strict';
const usersTable = require('../usersTable');
const User = require('../models/User');

async function createUser(event, context) {
  const user = User.fromCreate(JSON.parse(event.body));
  await usersTable.createUser(user);
  return user.toApiResponse();
};

module.exports = {
  handler: createUser,
};