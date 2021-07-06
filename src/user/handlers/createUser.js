'use strict';
const { usersTable, User } = require('../layerDeps');

async function createUser(event, context) {
  const user = User.fromCreate(JSON.parse(event.body));
  await usersTable.createUser(user);
  return user.toApiResponse();
};

module.exports = {
  handler: createUser,
};