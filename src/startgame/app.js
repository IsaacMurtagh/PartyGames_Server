'use strict';
require('aws-sdk');

exports.handler = async (event, context) => {
  try {
    const game = await require('./handlers/startGame').handler(event);
    await require('./handlers/sendRounds').handler({ game, event });
    return { statusCode: 200, body: 'Done.' };
  } catch(err) {
    console.error(err);
    return { statusCode: 500, body: 'Error ocurred' };
  }
}