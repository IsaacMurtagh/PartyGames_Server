'use strict';
require('aws-sdk'); // This must be required before handling requests to use the amazon sdk.
const createError = require('http-errors');

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
  try {
    console.log(event);
    this.schema && await this.schema.validateAsync(JSON.parse(event.body));
  } catch(err) {
    throw createError.BadRequest(err.message);
  }
  const body = await this.handler(event, context);
  return { body, statusCode: 200 };
}

exports.handler = async (event, context) => {
  try {
    switch (event.httpMethod) {
      case 'POST':
        return serializeResponse(await handle.bind(require('./handlers/makeChoice'))(event, context));
    }
  } catch(err) {
    if (err.statusCode) {
      const { statusCode, message } = err;
      return serializeResponse({ body: { message }, statusCode });
    }
    console.error(err);
    return serializeResponse({ statusCode: 500, body: { message: 'Internal Server Error' } })
  }
}