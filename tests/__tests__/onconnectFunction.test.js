const steps = require('../utils/steps');
const uuid = require('uuid');
const AwsMock = require('aws-sdk-mock');

describe('onConnectFunction', () => {
  it('make connection', async () => {
    const creatorResponse = await steps.createAUser();
    const gameResponse = await steps.createAGame({ 
      userId: creatorResponse.body.id,
      name: 'Pokemon Lobby',
      type: 'WouldYouRather',
    });

    const gameId = gameResponse.body.id;
    const userId = creatorResponse.body.id;
    const connectionId = uuid();
    const connectResponse = await steps.connectToWss({ gameId, userId, connectionId });

    expect(connectResponse).toEqual({
      statusCode: 200,
      body: { gameId, userId, connectionId }
    });
  });

  it('User has already made a connection with a game returns 403', async () => {
    AwsMock.mock('ApiGatewayManagementApi', 'postToConnection', (params, callback) => {
      callback();
    })
    const creatorResponse = await steps.createAUser();
    const gameResponse = await steps.createAGame({ 
      userId: creatorResponse.body.id,
      name: 'Pokemon Lobby',
      type: 'WouldYouRather',
    });

    const gameId = gameResponse.body.id;
    const userId = creatorResponse.body.id;
    await steps.connectToWss({ gameId, userId, connectionId: uuid() });

    const connectResponse = await steps.connectToWss({ gameId, userId, connectionId: uuid() });

    expect(connectResponse).toEqual({
      statusCode: 403,
      body: { message: 'CONNECTION_ALREADY_ESTABLISHED' }
    });
    AwsMock.restore();
  });
});