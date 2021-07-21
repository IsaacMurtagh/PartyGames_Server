'use strict';
const { usersTable } = require('../layerDeps');
const createError = require('http-errors')

async function getUser(event, context) {
  const { id } = event.pathParameters;
  const user = await usersTable.getUserById(id);
  if (!user) {
    throw createError.Forbidden('INVALID_USER_ID');
  }
  return user.toApiResponse();
};

module.exports = {
  handler: getUser,
};