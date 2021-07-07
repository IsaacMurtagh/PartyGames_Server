const steps = require('../utils/steps');

describe('gameFunction', () => {

  describe('createAGame', () => {

    it('given a valid userId', async () => {
      let response;
      response = await steps.createAUser();
      const userId = response.body.id;

      response = await steps.createAGame({ userId });
      expect(response.body.game).toBeDefined();
      expect(response.body.game.id).toBeDefined();
      expect(response.body.self.creator).toBeTruthy();

      const gameId = response.body.game.id;
      response = await steps.getGameById(gameId);
      expect(response.body.id).toEqual(gameId);
    });

    it('returns 403 when given an invalid userId', async () => {
      const response = await steps.createAGame({
        userId: 'U0001',
      })
      expect(response).toEqual({
        statusCode: 403,
        body: { message: 'INVALID_USER_ID' }
      });
    });
  });

  describe('joinAGame', () => {

    it('given a valid game', async () => {
      const creatorResponse = await steps.createAUser();
      const gameResponse = await steps.createAGame({ userId: creatorResponse.body.id });
      const joinerResponse = await steps.createAUser();

      const joinGameResponse = await steps.joinAGame({ 
        gameId: gameResponse.body.game.id,
        body: { userId: joinerResponse.body.id }
      });

      expect(joinGameResponse.body.game).toBeDefined();
      expect(joinGameResponse.body.self).toBeDefined();
      expect(joinGameResponse.body.self.creator).toBeFalsy();
    });
  });
});