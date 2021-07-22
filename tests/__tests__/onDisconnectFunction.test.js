const steps = require('../utils/steps');
const uuid = require('uuid');

describe('onDisconnectFunction', () => {
  it('disconnect connection', async () => {
    const creatorResponse = await steps.createAUser();
    const gameResponse = await steps.createAGame({ 
      userId: creatorResponse.body.id,
      name: 'Pokemon Lobby',
      type: 'WouldYouRather',
    });
    const gameId = gameResponse.body.id;
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