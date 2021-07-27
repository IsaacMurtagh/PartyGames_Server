const steps = require('../utils/steps');
const timeout = require('../utils/timeout');
const uuid = require('uuid');
const AwsMock = require('aws-sdk-mock');
const sinon = require('sinon');

function getGameBody(userId, overrides = {}) {
  return {
    userId,
    name: 'Pokemon Lobby',
    type: 'WouldYouRather',
    numberRounds: 1,
    roundTimeSeconds: 1,
    ...overrides
  }
}

describe('startGame', () => {

  it('Submit choice for game', async () => {
    const spy = sinon.spy();
    AwsMock.mock('ApiGatewayManagementApi', 'postToConnection', (params, callback) =>  {
      spy(JSON.parse(params.Data));
      callback();
    });

    const user = (await steps.createAUser()).body;
    const game = (await steps.createAGame(getGameBody(user.id))).body;
    
    const connectionId = uuid();
    await steps.connectToWss({ gameId: game.id, userId: user.id, connectionId });
    const [ _, makeChoiceResponse ] = await Promise.all([
      steps.startGameFromWss({ connectionId }),
      (async () => {
        await timeout(500);
        return steps.makeChoice({ 
          gameId: game.id,
          roundNumber: '1',
          body: {
            userId: user.id,
            choiceId: 0,
          }
        })
      })()
    ]);

    makeChoiceResponse.body.createdAt = undefined;
    expect(makeChoiceResponse).toEqual({
      statusCode: 200,
      body: {
        gameId: game.id,
        alias: user.alias,
        roundNumber: 1,
        choiceId: 0,
        roundNumber: 1
      }
    })
    expect(spy.calledThrice).toBeTruthy();
    AwsMock.restore();

  })

  it('game has not started', async () => {
    const user = (await steps.createAUser()).body;
    const game = (await steps.createAGame(getGameBody(user.id))).body;
    
    const makeChoiceResponse = await steps.makeChoice({ 
      gameId: game.id,
      roundNumber: '1',
      body: {
        userId: user.id,
        choiceId: 0,
      }
    });

    expect(makeChoiceResponse).toEqual({
      statusCode: 403,
      body: { message: 'GAME_NOT_IN_PROGRESS' }
    });
  })
});