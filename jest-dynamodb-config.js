module.exports = {
  tables: [
    // games Table
    {
      TableName: 'games',
      AttributeDefinitions: [
        { AttributeName: 'pk', AttributeType: 'S' },
        { AttributeName: 'sk', AttributeType: 'S' },
      ],
      KeySchema: [
        { AttributeName: 'pk', KeyType: 'HASH' },
        { AttributeName: 'sk', KeyType: 'RANGE' },
      ],
      ProvisionedThroughput: {ReadCapacityUnits: 1, WriteCapacityUnits: 1},
    },
    // users Table
    {
      TableName: 'users',
      AttributeDefinitions: [
        { AttributeName: 'pk', AttributeType: 'S' },
        { AttributeName: 'sk', AttributeType: 'S' },
      ],
      KeySchema: [
        { AttributeName: 'pk', KeyType: 'HASH' },
        { AttributeName: 'sk', KeyType: 'RANGE' },
      ],
      ProvisionedThroughput: {ReadCapacityUnits: 1, WriteCapacityUnits: 1},
    },
    // connections Table
    {
      TableName: 'connections',
      AttributeDefinitions: [
        { AttributeName: 'pk', AttributeType: 'S' },
        { AttributeName: 'sk', AttributeType: 'S' },
        { AttributeName: 'connectionId', AttributeType: 'S' },
      ],
      KeySchema: [
        { AttributeName: 'pk', KeyType: 'HASH' },
        { AttributeName: 'sk', KeyType: 'RANGE' },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'connectionId-index',
          KeySchema: [
            { AttributeName: 'connectionId', KeyType: 'HASH' },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
          ProvisionedThroughput: {ReadCapacityUnits: 1, WriteCapacityUnits: 1},
        },
      ],
      ProvisionedThroughput: {ReadCapacityUnits: 1, WriteCapacityUnits: 1},
    },
  ],
};