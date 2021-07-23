'use strict';
require('aws-sdk'); // This must be required before handling requests to use the amazon sdk.
const createError = require('http-errors');
const { handleGracefully } = require('./layerDeps');

async function handle(event, context) {
  try {
    this.schema && await this.schema.validateAsync(JSON.parse(event.body));
  } catch(err) {
    throw createError.BadRequest(err.message);
  }
  const body = await this.handler(event, context);
  return handleGracefully({ body, statusCode: 200 });
}

exports.handler = async (event, context) => {
  try {
    switch (event.httpMethod) {
      case 'GET':
        return await handle.bind(require('./handlers/getGame'))(event, context);
      case 'POST':
        return await handle.bind(require('./handlers/createGame'))(event, context);
    }
  } catch(err) {
    if (err.statusCode) {
      const { statusCode, message } = err;
      return handleGracefully({ body: { message }, statusCode });
    }
    console.error(err);
    return { statusCode: 500, body: 'Something went wrong' }
  }
}