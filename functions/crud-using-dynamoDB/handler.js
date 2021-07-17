'use strict';

const awsSdk = require('aws-sdk')

module.exports.listCustomers = async () => {

  try{

    const dynamoDb = new awsSdk.DynamoDB.DocumentClient()
    const params = {
      TableName: 'customers'
    }

    const { Items } = await dynamoDb.scan(params).promise()

    return {
      statusCode: 200,
      body: JSON.stringify(Items),
    };
  }catch(error){
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({message: 'Internal server error'})
    }
  }
};

module.exports.saveCustomers = async event => {
  try {
  
    return {
      statusCode: 200,
      body: event.body
    }

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
}

module.exports.deleteCustomer = async event => {
  return {}
}