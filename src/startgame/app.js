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

async function handle(event, context) {
  const body = await this.handler(event, context);
  return { body, statusCode: 200 };
}

exports.handler = async (event, context) => {
  try {
    return serializeResponse(await handle.bind(require('./handlers/startGame'))(event, context));
  } catch(err) {
    if (err.statusCode) {
      const { statusCode, message } = err;
      return serializeResponse({ body: { message }, statusCode });
    }
    console.error(err);
    return serializeResponse({ statusCode: 500, body: { message: 'Internal Server Error' } });
  }
}