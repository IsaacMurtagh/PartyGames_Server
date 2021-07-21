const steps = require('../utils/steps');

describe('gameFunction', () => {

  describe('createAGame', () => {

    it('given a valid userId', async () => {
      let response;
      response = await steps.createAUser();
      const userId = response.body.id;

      response = await steps.createAGame({ userId });
      expect(response.body.id).toBeDefined();

      const gameId = response.body.id;
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
});