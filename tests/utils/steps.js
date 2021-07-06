const generateEvent = require('../utils/generateEvent');
const userFunction = require('../../src/user/app').handler;
const gameFunction = require('../../src/game/app').handler;

function formatResponse(response) {
  return {
    ...response,
    body: JSON.parse(response.body),
  }
}

async function createAUser() {
  const event = generateEvent({
    httpMethod: 'POST',
  });
  return formatResponse(await userFunction(event));
};

async function getUserById(id) {
  const event = generateEvent({
    httpMethod: 'GET',
    pathParameters: {
      id,
    }
  });
  return formatResponse(await userFunction(event));
};

async function createAGame(body) {
  const event = generateEvent({
    httpMethod: 'POST',
    body,
  });
  return formatResponse(await gameFunction(event));
};

async function getGameById() {
  const event = generateEvent({
    httpMethod: 'GET',
    pathParameters: {
      id,
    }
  });
  return formatResponse(await gameFunction(event));
};


module.exports = {
  createAUser,
  getUserById,
  createAGame,
  getGameById,
}