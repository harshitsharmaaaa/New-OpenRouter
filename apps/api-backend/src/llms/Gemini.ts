import { Messages} from "../types";
import { BaseLLM, LlmResponse } from "./Base";
import  {GoogleGenAI} from "@google/genai"

const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_API_KEY
});


export class Gemini extends BaseLLM{
    static async chat(model:string,message: Messages):Promise <LlmResponse>{ 
        
        const response  = await ai.models.generateContent({
            model :model,
            contents: message.map((message)=>({
                text:message.content,
                role:message.role
            }))
        })
        return {
            outputTokenCosumed:response.usageMetadata?.candidatesTokenCount!,
            inputTokenConsumed:response.usageMetadata?.promptTokenCount!,
            completions:{
                choices:[{
                    message:{
                        content:response.text!
                    }
                }]
            }
        }
        
    }
}