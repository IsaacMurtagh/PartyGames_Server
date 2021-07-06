const steps = require('../utils/steps');

describe('gameFunction', () => {

  describe('createAGame', () => {

    it('given a valid userId', async () => {
      const userResponse = await steps.createAUser();
      const userId = userResponse.body.id;

      const gameResponse = await steps.createAGame({
        userId,
      })
      expect(gameResponse).toBeDefined();
      expect(gameResponse.body.userId).toBeUndefined();
      expect(gameResponse.body.id).toBeDefined();
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