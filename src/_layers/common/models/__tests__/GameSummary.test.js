const GameSummary = require('../GameSummary');

describe('GameSummary', () => {

  it('create a game summary from document data', () => {
    const items = [
      {
        pk: 'Game#494b4449-1b6b-4e52-a667-7dfbaf37e2dc',
        sk: 'Round#1',
        roundNumber: 1,
        createdAt: '2021-07-27T09:12:34.530Z',
        gameId: '494b4449-1b6b-4e52-a667-7dfbaf37e2dc',
        choices: [
          {
            description: 'exchange',
            id: 0
          },
          {
            description: 'order',
            id: 1
          }
        ]
      },
      {
        pk: 'Game#494b4449-1b6b-4e52-a667-7dfbaf37e2dc',
        sk: 'Round#1#User#4a0f33da-3723-413e-b16c-72e93a6febce',
        roundNumber: 1,
        alias: 'zktsouq806j',
        userId: '4a0f33da-3723-413e-b16c-72e93a6febce',
        createdAt: '2021-07-27T09:12:38.731Z',
        gameId: '494b4449-1b6b-4e52-a667-7dfbaf37e2dc',
        choiceId: 0
      },
      {
        pk: 'Game#494b4449-1b6b-4e52-a667-7dfbaf37e2dc',
        sk: 'Round#2',
        roundNumber: 2,
        createdAt: '2021-07-27T09:12:44.524Z',
        gameId: '494b4449-1b6b-4e52-a667-7dfbaf37e2dc',
        choices: [
          {
            description: 'ants',
            id: 0
          },
          {
            description: 'degree',
            id: 1
          }
        ]
      },
      {
        pk: 'Game#494b4449-1b6b-4e52-a667-7dfbaf37e2dc',
        sk: 'Round#2#User#4a0f33da-3723-413e-b16c-72e93a6febce',
        roundNumber: 2,
        alias: 'zktsouq806j',
        userId: '4a0f33da-3723-413e-b16c-72e93a6febce',
        createdAt: '2021-07-27T09:12:46.650Z',
        gameId: '494b4449-1b6b-4e52-a667-7dfbaf37e2dc',
        choiceId: 1
      },
      {
        pk: 'Game#494b4449-1b6b-4e52-a667-7dfbaf37e2dc',
        sk: 'Round#2#User#9a0f737e2dc-1b6b-4e52-a667-72e93a6febce',
        roundNumber: 2,
        alias: 'abb9962ajhw',
        userId: '9a0f737e2dc-1b6b-4e52-a667-72e93a6febce',
        createdAt: '2021-07-27T09:12:47.650Z',
        gameId: '494b4449-1b6b-4e52-a667-7dfbaf37e2dc',
        choiceId: 1
      }
    ]

    expected = {
      results: [
        {
          round: 1,
          totalAnswers: 1,
          choices: [
            {
              id: 0,
              description: 'exchange',
              votes: [ 'zktsouq806j' ],
            },
            {
              id: 1,
              description: 'order',
              votes: [],
            }
          ]
        },
        {
          round: 2,
          totalAnswers: 2,
          choices: [
            {
              id: 0,
              description: 'ants',
              votes: [],
            },
            {
              id: 1,
              description: 'degree',
              votes: [ 'zktsouq806j', 'abb9962ajhw' ],
            }
          ]
        }
      ],
    };

    expect(GameSummary.fromDocuments(items).toApiResponse()).toEqual(expected);
  })
})