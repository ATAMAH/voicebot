'use strict';

module.exports = Voice;

const axios = require('axios');

var debugOut;

function Voice(parameters) {
  this.parameters = parameters;
  this.config = parameters.config.voice;
  debugOut = this.parameters.debug;
  this.baseUrl = `https://${this.config.region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=${this.config.locale}`;
}

Voice.prototype.request = async function(data) {
  debugOut(`# Req: ${data.mime}, ${data.data.length}, ${this.config.token}`);

  let res;
  
  try {
    res = await axios({
      method: 'post',
      url: `${this.baseUrl}`,
      headers: {
        'Ocp-Apim-Subscription-Key': this.config.token,
        'Content-type': data.mime
      },
      data: data.data
    });
  }
  catch (e) {
    console.log(`# Axios error ${e}`);

    return null;
  }

  // {"RecognitionStatus":"Success","DisplayText":"Почему так смешно, блядь?","Offset":300000,"Duration":45500000}
  console.log(`# Azure resp: ${res.status}, ${JSON.stringify(res.data)}`);

  if (res.status == 200) {
    return res.data.DisplayText;
  }

  return null;
}