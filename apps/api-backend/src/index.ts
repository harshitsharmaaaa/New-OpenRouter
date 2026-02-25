import { Elysia ,t } from "elysia";
import {bearer} from  "@elysiajs/bearer"
import { Conversation } from "./types";
import {prisma} from "db";
import { Gemini } from "./llms/Gemini";
import { OpenAi } from "./llms/OpenAi";
import { Claude } from "./llms/Claude";
import { LlmResponse } from "./llms/Base";
const app = new Elysia()
    .use(bearer())
    .post("/api/v1/chat/completions",async ({status,bearer:apikey,body}) => {
    const model = body.model;
    const [companyName,providerModelName] = model.split("/");

    const ak = await prisma.apiKey.findFirst({
      where:{
        api_key:apikey,
        disabled:false,
        deleted:false
      },
      select:{
        user:true
      }
    })

    if(!ak){
      return status(403,{
        message:"Invalid api key"
      })
    }
     
    if(ak.user.credits<=0){ 
      return status(403,{
        message:"don't have enough credits"
      })
    }

    const modeldb = await prisma.model.findFirst({
      where: {
        slug:body.model
      },
      
    })

    if(!modeldb){
      return status(403,{
        message: "this is an Invalid model , we don't support that"
      })
    }
    
    const providers = await prisma.modelProviderMapping.findMany({
      where:{
        model_id:modeldb.id
      },
      include:{
        provider:true
      }
    })
    const provider = providers.length
      ? providers[Math.floor(Math.random() * providers.length)]
      : null;

    let response: LlmResponse | null = null;

    if (companyName === "google") {
      response = await Gemini.chat(providerModelName, body.message);
    } else if (companyName === "Openai") {
      response = await OpenAi.chat(providerModelName, body.message);
    } else if (companyName === "anthropic") {
      response = await Claude.chat(providerModelName, body.message);
    }

    if(!response || !provider){
      return status(403,{
        message:"NO provider found for this model"
      })
    }
    const creditsUsed = (response?.inputTokensConsumed * provider?.input_token_cost + response.outputTokensConsumed * provider?.output_token_cost) / 10;
    await prisma.$transaction([
      prisma.user.update({
        where:{
          id:ak.user.id
        },
        data:{
          credits:{
            decrement:creditsUsed
          }
        }
      })
    ])

    return response;
},{
  
  body: Conversation
}).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
