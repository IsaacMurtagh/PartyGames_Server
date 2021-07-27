const { 
  connectionsTable, 
  gamesTable, 
  SocketManager, 
} = require('../layerDeps');

async function finishGame({ event, gameId }) {
  const [ game, connections, participants ] = await Promise.all([
    gamesTable.getGameById(gameId),
    connectionsTable.getAllConnectionsForGame(gameId),
    gamesTable.getAllParticipants(gameId),
  ]);
  game.status = 'finished';
  game.participants = participants;

  const socketManager = new SocketManager(event.requestContext);
  await Promise.all([
    socketManager.postToAllConnections({ 
      connections, 
      data: game.toApiResponse(),
      message: 'GAME_FINISHED',
    }),
    gamesTable.create(game)
  ]);

  return game;
}

module.exports = {
  handler: finishGame,
}