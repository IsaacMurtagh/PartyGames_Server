

const generateEvent = event => {
  const { body, pathParameters, httpMethod, path, queryStringParameters, requestContext = {} } = event;

  return {
    body: JSON.stringify(body || {}),
    httpMethod,
    path,
    pathParameters,
    queryStringParameters,
    isBase64Encoded: false,
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    },
    requestContext
  }
}

module.exports = generateEvent;