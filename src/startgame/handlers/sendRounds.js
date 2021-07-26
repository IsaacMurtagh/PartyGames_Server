const { 
  connectionsTable, 
  SocketManager, 
  gamesTable,
  Round,
} = require('../layerDeps');

async function timeout(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}

async function newRound({ gameId, roundNumber, socketManager}) {
  const connections = await connectionsTable.getAllConnectionsForGame(gameId);
  const round = Round.fromCreate({ gameId, roundNumber });
  await gamesTable.create(round);

  return socketManager.postToAllConnections({ 
    connections,
    data: round.toApiResponse(),
    message: 'NEW_ROUND',
  });
}

async function sendRounds({ game, event}) {
  const socketManager = new SocketManager(event.requestContext);
  let i = 0;
  while (i < game.numberRounds) {
    await Promise.all([
      newRound({ gameId: game.id, socketManager, roundNumber: (i + 1) }),
      timeout(game.roundTimeMs)
    ]);
    i++;
  }
  return;
}

module.exports = {
  handler: sendRounds,
}