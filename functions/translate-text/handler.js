'use strict';

const awsSdk = require('aws-sdk')

module.exports.translateText = async (event) => {
  
  try {
                      
    const { text } = event.queryStringParameters
    
    const params = {
      SourceLanguageCode: 'auto',
      TargetLanguageCode: 'pt',
      Text: text
    }

    const translatorSVC = new awsSdk.Translate()
    const { TranslatedText } = await translatorSVC
                        .translateText(params)
                        .promise()

    return {
      statusCode: 200,
      body: JSON.stringify({ text: TranslatedText })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Internal server error!'
    }
  }
};
