const awsSdk = require('aws-sdk')

const dynamoDbSvc = new awsSdk.DynamoDB.DocumentClient()

module.exports = dynamoDbSvc