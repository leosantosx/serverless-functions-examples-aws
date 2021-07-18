class Handler{

    constructor({ uuid, dynamoSVC }){
        this.uuid = uuid
        this.dynamoSVC = dynamoSVC
    }

    async create (event) {
    
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
                created_at: new Date().getTime(),
                updated_at: new Date().getTime(),
            }
        
            await this.dynamoSVC.put({
                TableName: process.env.TABLE_NAME,
                Item: customer,
            }).promise()
        
            return {
                statusCode: 201,
                body: JSON.stringify(customer)
            }
        
        } catch (error) {
        
            console.log(error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Internal server error' })
            }
        }
    }
}


const { v4: uuid} = require('uuid')
const dynamoSVC = require('./config')

const handler = new Handler({
    uuid,
    dynamoSVC
})

module.exports.main = handler.create.bind(handler)