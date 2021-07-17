class Handler{

  constructor({ parserMultipart, s3 }){
    this.parserMultipart = parserMultipart
    this.s3 = s3
  }

  async sendFileToS3({ filename, buffer }){
    const status = await this.s3.putObject({
      Bucket: '',
      Body: buffer,
      Key: filename
    }).promise()

    console.log(status);
    return status
  }

  async main(event){

    try{
      const result = await this.parserMultipart.parse(event);
      const { content, filename } = result.files[0] 
      console.log(result.files[0].content.toString('binary'))

      this.sendFileToS3({
        filename, 
        buffer: content.toString('binary'),
      })

      return{
        statusCode: 200,
        body: 'Ok'
      }
    }catch(error){
      console.log(error);
      return{
        statusCode: 500,
        body: JSON.stringify(error)
      }
    }
  }
}


const parserMultipart = require('lambda-multipart-parser');
const AWS = require('aws-sdk')

const s3 = new AWS.S3()

const handler = new Handler({
  parserMultipart, 
  s3
})

module.exports.main = handler.main.bind(handler)