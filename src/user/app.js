'use strict';
require('./dbClient'); // This must be required before handling requests to use the amazon sdk.

async function handle(event, context) {
  const response = await this.handler(event, context);
  return { 
    statusCode: response?.statusCode || 200,
    body: JSON.stringify(response || {})
  }
}

exports.handler = async (event, context) => {
  switch (event.httpMethod) {
    case 'GET':
      return await handle.bind(require('./handlers/getUser'))(event, context);
    case 'POST':
      return await handle.bind(require('./handlers/createUser'))(event, context);
  }
}