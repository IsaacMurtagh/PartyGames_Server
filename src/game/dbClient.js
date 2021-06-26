'use strict';

const AWS = require('aws-sdk');

const config = {
	region: 'ap-southeast-2'
}
if (process.env.AWS_SAM_LOCAL) {
	config.endpoint = 'http://dynamo:8000';
};

const dynamoDb = new AWS.DynamoDB.DocumentClient(config);
module.exports = dynamoDb;