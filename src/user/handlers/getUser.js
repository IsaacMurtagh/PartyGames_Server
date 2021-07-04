'use strict';
const usersTable = require('../usersTable');
const createError = require('http-errors')

async function getUser(event, context) {
  const { id } = event.pathParameters;
  const user = await usersTable.getUserById(id);
  if (!user) {
    return createError.Forbidden('INVALID_USER_ID');
  }
  return user.toApiResponse();
};

module.exports = {
  handler: getUser,
};