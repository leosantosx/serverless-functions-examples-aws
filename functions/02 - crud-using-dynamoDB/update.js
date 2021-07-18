class Handler{

    constructor({ dynamoSVC }){
        this.dynamoSVC = dynamoSVC
    }

    async update (event) {
    
        try {
            const { id } = event.pathParameters
            const parserBody = JSON.parse(event.body)
            
            const { name, age, gender, email, phone } = parserBody
    
            const params = {
                TableName: process.env.TABLE_NAME,
                Key: { id },
                ConditionExpressions: 'attribute_exists(id)',

                UpdateExpression: 'SET #name = :name, age = :age, gender = :gender,' 
                + 'email = :email, phone = :phone, updated_at = :updated_at',
                
                ExpressionAttributeNames: {
                    "#name": 'name'
                },
                ExpressionAttributeValues: {
                    ':name': name,
                    ':age': age,
                    ':gender': gender,
                    ':email': email,
                    ':phone': phone,
                    ':updated_at': new Date().getTime(),
                }
            }
            await this.dynamoSVC.update(params).promise()
        
            return {
                statusCode: 204,
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

const dynamoSVC = require('./config')

const handler = new Handler({
    dynamoSVC
})

module.exports.main = handler.update.bind(handler)