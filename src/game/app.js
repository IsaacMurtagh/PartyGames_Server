'use strict';
require('aws-sdk'); // This must be required before handling requests to use the amazon sdk.

async function handle(event, context) {
  const response = await this.handler(event, context);
  return { 
    statusCode: response?.statusCode || 200,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
    body: JSON.stringify(response || {})
  }
}


exports.handler = async (event, context) => {
  switch (event.httpMethod) {
    case 'GET':
      return await handle.bind(require('./handlers/getGame'))(event, context);
    case 'POST':
      if (/\/games\/.*\/join$/.test(event.path)) {
        return await handle.bind(require('./handlers/joinGame'))(event, context);
      }
      return await handle.bind(require('./handlers/createGame'))(event, context);
  }
}