'use strict';

const awsSdk = require('aws-sdk')
const fs = require('fs');

async function recognizeImage(err, buffer){
    const reko = new awsSdk.Rekognition()
    
    const { Labels } = await reko.detectLabels({
      Image: { Bytes: buffer },
      MaxLabels: 10,
    }).promise()

    const names = Labels.map(result => result.Name)

    const params = {
      SourceLanguageCode: 'auto',
      TargetLanguageCode: 'pt',
      Text: names.join(' and ')
    }

    const translatorSVC = new awsSdk.Translate()
    const { TranslatedText } = await translatorSVC
                        .translateText(params)
                        .promise()

    const texts = TranslatedText.split(' e ')

    for(const textIndex in texts){
      const confidence = Labels[textIndex].Confidence.toFixed(2)
      const nameInPortuguese = texts[textIndex]

      console.log(`${confidence}% de ser do tipo ${nameInPortuguese}`)
    }
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
