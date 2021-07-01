'use strict';
const usersTable = require('../usersTable');

async function getUser(event, context) {
  const { id } = event.pathParameters;
  return await usersTable.getUserById(id);
};

module.exports = {
  handler: getUser,
};