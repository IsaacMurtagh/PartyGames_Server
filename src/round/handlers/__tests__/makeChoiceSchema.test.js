const { schema } = require('../makeChoice.js');

const validBody = {
  userId: '50b2a70e-283c-4db5-b056-d69ee34702ee',
  choiceId: 0,
}

describe('makeChoice Schema', () => {
  it('valid makeChoice', () => {
    expect(schema.validate(validBody).error).toBeUndefined();
  })

  it('missing userId', () => {
    expect(schema.validate({
      ...validBody,
      userId: undefined
    }).error).toBeDefined();
  })

  it('missing choiceId', () => {
    expect(schema.validate({
      ...validBody,
      choiceId: undefined,
    }).error).toBeDefined();
  })

  it('choiceId is a string', () => {
    expect(schema.validate({
      ...validBody,
      choiceId: 'string'
    }).error).toBeDefined();
  })

  it('choiceId is a negitive number', () => {
    expect(schema.validate({
      ...validBody,
      choiceId: -1
    }).error).toBeDefined();
  })
})