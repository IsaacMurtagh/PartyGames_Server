const { 
  connectionsTable, 
  SocketManager, 
} = require('../layerDeps');

async function timeout(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}

async function sendRounds({ game, event}) {
  const connections = await connectionsTable.getAllConnectionsForGame(game.id);
  const socketManager = new SocketManager(event.requestContext);
  const numRounds = 5;
  let i = 0;

  while (i < numRounds) {
    await Promise.all([
      socketManager.postToAllConnections({ 
        connections, 
        data: game.toApiResponse(),
        message: 'NEW_ROUND',
      }),
      timeout(10000)
    ]);
    i++;
  }
  return;
}

module.exports = {
  handler: sendRounds,
}