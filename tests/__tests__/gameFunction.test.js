const steps = require('../utils/steps');
const uuid = require('uuid');
const timeout = require('../utils/timeout');
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

describe('gameFunction', () => {

  describe('createAGame', () => {

    it('create and get given a valid userId', async () => {
      let response;
      response = await steps.createAUser();
      const userId = response.body.id;

      response = await steps.createAGame({ 
        userId,
        name: 'Pokemon Lobby',
        type: 'WouldYouRather', 
      });
      expect(response.body.id).toBeDefined();

      const gameId = response.body.id;
      response = await steps.getGameById(gameId);
      expect(response.body.id).toEqual(gameId);
    });

    it('returns 403 when given an invalid userId', async () => {
      const response = await steps.createAGame({
        userId: 'edf22347-1fc9-4a40-a8d9-3e1aecda2b2c',
        name: 'Pokemon Lobby',
        type: 'WouldYouRather',
      })
      expect(response).toEqual({
        statusCode: 403,
        body: { message: 'INVALID_USER_ID' }
      });
    });

    it('Game returns participants who have joined', async () => {
      const user = (await steps.createAUser()).body;
      const userId = user.id;
      const game = (await steps.createAGame({ 
        userId,
        name: 'Pokemon Lobby',
        type: 'WouldYouRather',
      })).body;
  
      const gameId = game.id;
      const connectionId = uuid();
      const displayName = 'joey';
      await steps.connectToWss({ gameId, userId, connectionId, displayName });

      const activeGameResponse = await steps.getGameById(gameId);
      expect(activeGameResponse.body.participants).toEqual([
        { alias: user.alias, displayName, active: true },
      ]);

      await steps.disconnectFromWss({ connectionId, });
      const inactiveGameResponse = await steps.getGameById(gameId);
      expect(inactiveGameResponse.body.participants).toEqual([
        { alias: user.alias, displayName, active: false },
      ]);
    });

    it('Once game is finished, game summary is returned', async () => {
      const spy = sinon.spy();
      AwsMock.mock('ApiGatewayManagementApi', 'postToConnection', (params, callback) =>  {
        console.log(params);
        spy(JSON.parse(params.Data));
        callback();
      });

      const user = (await steps.createAUser()).body;
      const game = (await steps.createAGame(getGameBody(user.id))).body;
      
      const connectionId = uuid();
      const displayName = 'joey';
      await steps.connectToWss({ gameId: game.id, userId: user.id, connectionId, displayName });
      await Promise.all([
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

      const getGameResponse = await steps.getGameById(game.id);

      expect(spy.calledThrice).toBeTruthy();
      console.log(getGameResponse);
      expect(getGameResponse.statusCode).toEqual(200);
      expect(getGameResponse.body.summary?.results.length).toEqual(1);
      AwsMock.restore();
    })
  });
});