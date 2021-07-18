class Handler{
    constructor({ dynamoDbSvc }){
        this.dynamoDbSvc = dynamoDbSvc
    }

    async list() {

      try{
  
        const params = {
          TableName: process.env.TABLE_NAME,
        }
    
        const { Items } = await this.dynamoDbSvc.scan(params).promise()
    
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
    }
}

const dynamoDbSvc = require('./config')

const handler = new Handler({
  dynamoDbSvc
})

module.exports.main = handler.list.bind(handler)