const steps = require('../utils/steps');
const uuid = require('uuid');

describe('onDisconnectFunction', () => {
  it('disconnect connection', async () => {
    const creatorResponse = await steps.createAUser();
    const gameResponse = await steps.createAGame({ userId: creatorResponse.body.id });
    const gameId = gameResponse.body.game.id;
    const userId = creatorResponse.body.id;
    const connectionId = uuid();
    await steps.connectToWss({ gameId, userId, connectionId });

    const disconnectResponse = await steps.disconnectFromWss({ connectionId });

    expect(disconnectResponse).toEqual({
      statusCode: 200,
      body: { gameId, userId, connectionId }
    });
  });
});