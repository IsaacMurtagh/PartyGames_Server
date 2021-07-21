const steps = require('../utils/steps');
const uuid = require('uuid');

describe('onConnectFunction', () => {
  it('make connection', async () => {
    const creatorResponse = await steps.createAUser();
    const gameResponse = await steps.createAGame({ userId: creatorResponse.body.id });

    const gameId = gameResponse.body.id;
    const userId = creatorResponse.body.id;
    const connectionId = uuid();
    const connectResponse = await steps.connectToWss({ gameId, userId, connectionId });

    expect(connectResponse).toEqual({
      statusCode: 200,
      body: { gameId, userId, connectionId }
    });
  });
});