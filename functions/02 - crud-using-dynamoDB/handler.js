'use strict';

const awsSdk = require('aws-sdk')
const { v4: uuid} = require('uuid')

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
    const parserBody = JSON.parse(event.body)
    
    const { name, age, gender, email, phone } = parserBody

    const customer = {
      id: uuid(),
      name,
      age,
      gender,
      email,
      phone,
      created_at: new Date(),
      updated_at: new Date(),
    }
  
    return {
      statusCode: 200,
      body: JSON.stringify(customer)
    }

  } catch (error) {

    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
}

module.exports.deleteCustomer = async event => {
  return {}
}