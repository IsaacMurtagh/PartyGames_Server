const steps = require('../utils/steps');
const uuid = require('uuid');
const AwsMock = require('aws-sdk-mock');
const sinon = require('sinon');

describe('startGame', () => {

  it('starts game after connection is made', async () => {
    const spy = sinon.spy();
    AwsMock.mock('ApiGatewayManagementApi', 'postToConnection', (params, callback) =>  {
      spy(JSON.parse(params.Data));
      callback();
    });

    const user = (await steps.createAUser()).body;
    const game = (await steps.createAGame({ 
      userId: user.id,
      name: 'Pokemon Lobby',
      type: 'WouldYouRather',
      numberRounds: 1,
      roundTimeSeconds: 1,
    })).body;

    const connectionId = uuid();
    await steps.connectToWss({ gameId: game.id, userId: user.id, connectionId });
    await steps.startGameFromWss({ connectionId });

    const expectedGameStarted = {
      message: 'GAME_STARTED',
      data: {
        ...game,
        status: 'inprogress',
        participants: [{ alias: user.alias, active: true }]
      },
    }
    const expectedGameFinished = {
      message: 'GAME_FINISHED',
      data: {
        ...game,
        status: 'finished',
        participants: [{ alias: user.alias, active: true }]
      },
    }
    expect(spy.calledThrice).toBeTruthy();
    expect(spy.calledWith(expectedGameStarted)).toBeTruthy();
    expect(spy.calledWith(expectedGameFinished)).toBeTruthy();
    AwsMock.restore();
  });

  it('cannot start game if it has already been started', async () => {
    const spy = sinon.spy();
    AwsMock.mock('ApiGatewayManagementApi', 'postToConnection', (params, callback) =>  {
      spy(JSON.parse(params.Data));
      callback();
    });

    const user = (await steps.createAUser()).body;
    const game = (await steps.createAGame({ 
      userId: user.id,
      name: 'Pokemon Lobby',
      type: 'WouldYouRather',
      numberRounds: 1,
      roundTimeSeconds: 1,
    })).body;

    const connectionId = uuid();
    await steps.connectToWss({ gameId: game.id, userId: user.id, connectionId });
    await steps.startGameFromWss({ connectionId });

    expect(spy.calledThrice).toBeTruthy();

    const startGameResponse = await steps.startGameFromWss({ connectionId });
    expect(startGameResponse).toEqual({
      statusCode: 400,
      body: { message: 'GAME_ALREADY_STARTED' },
    })
    AwsMock.restore();
  })
});