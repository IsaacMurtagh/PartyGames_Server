const generateEvent = require('../utils/generateEvent');
const userFunction = require('../../src/user/app').handler;
const gameFunction = require('../../src/game/app').handler;
const onConnectFunction = require('../../src/onConnect/app').handler;
const onDisconnectFunction = require('../../src/onDisconnect/app').handler;
const startGame = require('../../src/startGame/app').handler;

function formatResponse(response, removeHeaders=true) {
  try {
    return {
      ...response,
      body: JSON.parse(response.body),
      headers: removeHeaders ? undefined : response.headers,
    }
  } catch(err) {
    console.error({ response, err });
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

async function getGameById(gameId) {
  const event = generateEvent({
    httpMethod: 'GET',
    pathParameters: {
      gameId,
    }
  });
  return formatResponse(await gameFunction(event));
};

async function joinAGame({ gameId, body }) {
  const event = generateEvent({
    path: `/games/${gameId}/join`,
    httpMethod: 'POST',
    pathParameters: {
      gameId,
    },
    body,
  });
  return formatResponse(await gameFunction(event));
};

async function connectToWss({ gameId, userId, connectionId, displayName }) {
  const event = generateEvent({
    queryStringParameters: {
      gameId,
      userId,
      displayName,
    },
    requestContext: {
      connectionId,
    }
  });
  return formatResponse(await onConnectFunction(event));
};

async function disconnectFromWss({ connectionId }) {
  const event = generateEvent({
    requestContext: {
      connectionId,
    }
  });
  return formatResponse(await onDisconnectFunction(event));
};

async function startGameFromWss({ connectionId }) {
  const event = generateEvent({
    requestContext: {
      connectionId,
    }
  });
  return await startGame(event);
};




module.exports = {
  createAUser,
  getUserById,
  createAGame,
  getGameById,
  joinAGame,
  connectToWss,
  disconnectFromWss,
  startGameFromWss,
}