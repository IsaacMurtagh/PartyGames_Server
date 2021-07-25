const { schema } = require('../createGame.js');

const validBody = {
  name: 'Pokemon man',
  type: 'WouldYouRather',
  allowNicknames: false,
  userId: '50b2a70e-283c-4db5-b056-d69ee34702ee',
  roundTimeSeconds: 10,
  numberRounds: 5,
}

describe('createGame Schema', () => {
  it('valid createGame', () => {
    expect(schema.validate(validBody).error).toBeUndefined();
  })

  it('invalid name', () => {
    expect(schema.validate({
      ...validBody,
      name: 'a'.repeat(17)
    }).error).toBeDefined();
  })

  it('invalid type', () => {
    expect(schema.validate({
      ...validBody,
      type: 'Catch Em All'
    }).error).toBeDefined();
  })

  it('invalid allowNickNames', () => {
    expect(schema.validate({
      ...validBody,
      allowNicknames: 'string'
    }).error).toBeDefined();
  })

  it('invalid userId', () => {
    expect(schema.validate({
      ...validBody,
      UserId: '0000001'
    }).error).toBeDefined();
  })

  it('too low roundNumberSeconds', () => {
    expect(schema.validate({
      ...validBody,
      roundTimeSeconds: 0,
    }).error).toBeDefined();
  })

  it('too high roundNumberSeconds', () => {
    expect(schema.validate({
      ...validBody,
      roundTimeSeconds: 35,
    }).error).toBeDefined();
  })

  it('too high numberRounds', () => {
    expect(schema.validate({
      ...validBody,
      numberRounds: 11,
    }).error).toBeDefined();
  })

  it('too low numberRounds', () => {
    expect(schema.validate({
      ...validBody,
      numberRounds: 0,
    }).error).toBeDefined();
  })
})