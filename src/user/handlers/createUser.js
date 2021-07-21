'use strict';
const { usersTable, User } = require('../layerDeps');

async function createUser(event, context) {
  const user = User.fromCreate();
  await usersTable.createUser(user);
  return user.toApiResponse();
};

module.exports = {
  handler: createUser,
};