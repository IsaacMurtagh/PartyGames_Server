require('aws-sdk');
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
    this.schema && await this.schema.validateAsync(JSON.parse(event.body));
  } catch(err) {
    throw createError.BadRequest(err.message);
  }
  const body = await this.handler(event, context);
  return { body, statusCode: 200 };
}

exports.handler = async function(event, context) {
  try {
    return serializeResponse(await handle.bind(require('./handlers/onConnect'))(event, context));
  } catch(err) {
    console.log(err.statusCode);
    if (err.statusCode) {
      const { statusCode, message } = err;
      return serializeResponse({ body: { message }, statusCode });
    }
    console.error(err);
    return serializeResponse({ statusCode: 500, body: 'Internal Server Error' })
  }
}
