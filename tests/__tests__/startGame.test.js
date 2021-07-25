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
    })).body;

    const connectionId = uuid();
    await steps.connectToWss({ gameId: game.id, userId: user.id, connectionId });
    await steps.startGameFromWss({ connectionId });

    const expectedResponse = {
      message: 'GAME_STARTED',
      data: { gameId: game.id },
    }

    expect(spy.calledOnce).toBeTruthy();
    expect(spy.calledWith(expectedResponse)).toBeTruthy();
    AwsMock.restore();
  });
});