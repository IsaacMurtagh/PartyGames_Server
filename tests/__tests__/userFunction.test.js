const steps = require('../utils/steps');

describe('userFunction', () => {

  it('create a user', async () => {
    const response = await steps.createAUser();
    expect(response).toBeDefined();
    expect(response.body.id).toBeDefined();
  });

  it('get a user by id', async () => {
    const createResponse = await steps.createAUser();
    const id = createResponse.body.id;

    const response = await steps.getUserById(id);
    console.log(response);
    expect(response.body.id).toBeDefined();
    expect(response.body.alias).toBeDefined();
  });

  it('get a user by bad id returns 403', async () => {
    const response = await steps.getUserById('A0001');
    expect(response).toEqual({
      statusCode: 403,
      body: { message: 'INVALID_USER_ID' }
    });
  });
});