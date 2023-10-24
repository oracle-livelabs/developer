

import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_SECRET_KEY
});

const openAi = new OpenAIApi(configuration);
//console.log("openAI is " + openAi)

export async function POST(req) {

  const body = await req.json()
  //console.log("Request", body);
    try {
      const res = await openAi.createCompletion({
        model:"text-davinci-003",
        prompt:body.prompt
      })

      //console.log("**********************")
      //console.log("********************** res is " + res.data.choices[0].text)

      var rval = JSON.stringify({result: res.data.choices[0].text})
      console.log("rval: " + rval)
      return NextResponse.json(rval);
    } catch (e) {
        console.log("Error getting GPT completion: \n" + e)
      //throw e
    }
}
