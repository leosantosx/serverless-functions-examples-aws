class Handler{
    constructor({ dynamoDbSvc }){
        this.dynamoDbSvc = dynamoDbSvc
    }

    async delete(event){
        try {
            const { id } = event.pathParameters

            await this.dynamoDbSvc.delete({
                TableName: process.env.TABLE_NAME,
                Key: { id }
            }).promise()
            
            return {
                statusCode: 204,
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                body: JSON.stringify({ messge: 'Internal server error' })
            }
        }
    } 
}

const dynamoDbSvc = require('./config')

const handler = new Handler({
    dynamoDbSvc
})

module.exports.main = handler.delete.bind(handler)