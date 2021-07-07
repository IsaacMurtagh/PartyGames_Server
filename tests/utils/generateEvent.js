

const generateEvent = event => {
  const { body, pathParameters, httpMethod, path } = event;

  return {
    body: JSON.stringify(body || {}),
    httpMethod,
    path,
    pathParameters,
    isBase64Encoded: false,
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    },
  }
}

module.exports = generateEvent;