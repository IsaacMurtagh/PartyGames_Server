const steps = require('../utils/steps');
const uuid = require('uuid');

describe('onDisconnectFunction', () => {
  it('disconnect connection', async () => {
    const connectionId = uuid();
    const creatorResponse = await steps.createAUser();
    const gameResponse = await steps.createAGame({ userId: creatorResponse.body.id });
    await steps.connectToWss({ 
      gameId: gameResponse.body.game.id,
      userId: creatorResponse.body.id,
      connectionId,
    });

    const disconnectResponse = await steps.disconnectFromWss({ connectionId });

    expect(disconnectResponse).toEqual({
      statusCode: 200,
      body: 'Disconnected.',
    })
  });
});