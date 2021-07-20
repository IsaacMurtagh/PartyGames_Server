const steps = require('../utils/steps');
const uuid = require('uuid');

describe('onConnectFunction', () => {
  it('make connection', async () => {
    const creatorResponse = await steps.createAUser();
    const gameResponse = await steps.createAGame({ userId: creatorResponse.body.id });

    const gameId = gameResponse.body.game.id;
    const userId = creatorResponse.body.id;
    const connectionId = uuid();
    const connectResponse = await steps.connectToWss({ gameId, userId, connectionId });

    expect(connectResponse.statusCode).toEqual(200);
    connectResponse.body.createdAt = undefined;
    expect(connectResponse.body).toEqual({ gameId, userId, connectionId });
  });
});