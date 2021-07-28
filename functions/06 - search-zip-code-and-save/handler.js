class Handler {
  
  constructor({ axios, dynamoDbSVC }){
    this.axios = axios
    this.dynamoDbSVC = dynamoDbSVC
  }

  async findZipCode(zipcode){
    const response = await this.axios.get(`https://viacep.com.br/ws/${zipcode}/json/`)
    return response.data;
  }

  async saveAddress(address){
    await this.dynamoDbSVC.put({
      TableName: process.env.TABLE_NAME,
      Item: address
    }).promise()
  }

  async main (event){
    try {
      const { zipcode } = event.pathParameters

      const address = await this.findZipCode(zipcode)

      await this.saveAddress(address)

      return {
        statusCode: 200,
        body: JSON.stringify(address),
      }
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: JSON.stringify({message: 'Internal server error'})
      }
    }
  }
}


const axios = require('axios')
const Aws = require('aws-sdk')

const dynamoDbSVC = new Aws.DynamoDB.DocumentClient()

const handler = new Handler({
  axios,
  dynamoDbSVC
})

module.exports.main = handler.main.bind(handler)