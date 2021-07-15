class Handler{

  constructor({ parserMultipart }){
    this.parserMultipart = parserMultipart
  }

  async main(event){

    const result = await this.parserMultipart.parse(event);
    console.log(result.files)

    try{
      return{
        statusCode: 200,
        body: JSON.stringify(event)
      }
    }catch(error){
      console.log(error);
      return{
        statusCode: 500,
        body: 'Internal server error'
      }
    }
  }
}


const parserMultipart = require('lambda-multipart-parser');
const handler = new Handler({
  parserMultipart
})

module.exports.main = handler.main.bind(handler)