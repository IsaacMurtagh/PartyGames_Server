const steps = require('../utils/steps');
const uuid = require('uuid');
const AwsMock = require('aws-sdk-mock');
const sinon = require('sinon');

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
    const spy = sinon.spy();
    AwsMock.mock('ApiGatewayManagementApi', 'postToConnection', (params, callback) =>  {
      spy(JSON.parse(params.Data));
      callback();
    });
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

    expect(spy.notCalled).toBeTruthy();
    expect(connectResponse).toEqual({
      statusCode: 403,
      body: { message: 'CONNECTION_ALREADY_ESTABLISHED' }
    });
    AwsMock.restore();
  });

  it('User is broadcasted with message when another user joins', async () => {
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
    await steps.connectToWss({ gameId, userId: userOne.id, connectionId: uuid() });
    await steps.connectToWss({ 
      gameId, 
      userId: userTwo.id, 
      connectionId: uuid(),
      displayName: 'pokemon man'
    });
    
    const expectedResponse = {
      message: 'PLAYER_JOINED',
      data: { 
        alias: userTwo.alias,
        displayName: 'pokemon man',
        active: true,
      }
    }
    expect(spy.calledOnce).toBeTruthy();
    expect(spy.calledWith(expectedResponse)).toBeTruthy();
    AwsMock.restore();
  });
});