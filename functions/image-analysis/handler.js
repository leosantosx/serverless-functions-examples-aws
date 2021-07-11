'use strict';

const awsSdk = require('aws-sdk')
const fs = require('fs')

async function recognizeImage(err, buffer){
    if(err){
      return console.log('Internal server error!')
    }
    const reko = new awsSdk.Rekognition()
    
    const result = await reko.detectLabels({
      Image: { Bytes: buffer },
      MaxLabels: 10,
    }).promise()

    return console.log(result)
}

module.exports.analyse = async (event) => {
  try{

    await fs.readFile('./img/dog.jpg', recognizeImage)

  }catch (error){
    console.log(error)
    return {
      statusCode: 500,
      body: 'Internal server error!'
    }

  }
};
