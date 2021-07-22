const steps = require('../utils/steps');
const uuid = require('uuid');
const AwsMock = require('aws-sdk-mock');
const sinon = require('sinon');

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

  it('disconnect connection that does not exist', async () => {
    const disconnectResponse = await steps.disconnectFromWss({ connectionId: 'randomConnectionId' });

    expect(disconnectResponse).toEqual({
      statusCode: 200,
      body: { message: 'Connection already terminated' }
    });
  });

  it('Message is broadcast on disconnect', async () => {
    const spy = sinon.spy();
    AwsMock.mock('ApiGatewayManagementApi', 'postToConnection', (params, callback) =>  {
      spy(JSON.parse(params.Data));
      callback();
    });

    const userOne = (await steps.createAUser()).body;
    const userTwo = (await steps.createAUser()).body;
    const game = (await steps.createAGame({ 
      userId: userOne.id,
      name: 'Pokemon Lobby',
      type: 'WouldYouRather',
    })).body;

    const gameId = game.id;
    connectionId = uuid();
    await steps.connectToWss({ gameId, userId: userOne.id, connectionId: uuid() });
    await steps.connectToWss({ gameId, userId: userTwo.id, connectionId, });
    await steps.disconnectFromWss({ connectionId, });

    const expectedResponse = {
      message: 'PLAYER_LEFT',
      data: { alias: userTwo.alias }
    }

    expect(spy.calledTwice).toBeTruthy();
    expect(spy.calledWith(expectedResponse)).toBeTruthy();
    AwsMock.restore();
  });
});