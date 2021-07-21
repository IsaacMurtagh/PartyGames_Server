function handleGracefully({ statusCode, body }) {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
  }
}

module.exports = handleGracefully;