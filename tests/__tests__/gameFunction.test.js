const generateEvent = require('../utils/generateEvent');
const gameFunction = require('../../src/game/app').handler;

describe('gameFunction', () => {

  describe('getGameById', () => {

    it('is given a valid gameId', async () => {
      const event = generateEvent({
        httpMethod: 'GET',
        pathParameters: {
          id: 'ce1e305f-4549-4384-a69f-a4b58bb332e6'
        }
      });
      expect(event).toBeDefined();

      // const result = await gameFunction(event);
      // console.log(result);
    });
  });
});