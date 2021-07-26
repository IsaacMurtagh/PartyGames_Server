'use strict';
require('aws-sdk');

function serializeResponse({ body, statusCode }) {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
  }
}

exports.handler = async (event, context) => {
  try {
    const game = await require('./handlers/startGame').handler(event);
    await require('./handlers/sendRounds').handler({ game, event });
    await require('./handlers/finishGame').handler({ gameId: game.id, event });

    return serializeResponse({ statusCode: 200, body: 'Done.' });
  } catch(err) {
    if (err.statusCode) {
      const { statusCode, message } = err;
      return serializeResponse({ body: { message }, statusCode });
    }
    console.error(err);
    return serializeResponse({ statusCode: 500, body: { message: 'Internal Server Error' } })
  }
}