

const generateEvent = event => {
  const { body, pathParameters, httpMethod } = event;

  return {
    body: JSON.stringify(body || {}),
    httpMethod,
    pathParameters,
    isBase64Encoded: false,
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    },
  }
}

module.exports = generateEvent;