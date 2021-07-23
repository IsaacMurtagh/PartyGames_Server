const steps = require('../utils/steps');
const uuid = require('uuid');

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

      const getGameResponse = await steps.getGameById(gameId);
      expect(getGameResponse.body.participants).toEqual([
        { alias: user.alias, displayName, },
      ]);
    });
  });
});