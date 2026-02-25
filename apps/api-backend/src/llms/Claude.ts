import { TextBlock } from "@anthropic-ai/sdk/resources";
import { Messages} from "../types";
import { BaseLLM, LlmResponse } from "./Base";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
    apiKey:process.env.CLAUDE_API_KEY
});

export class Claude extends BaseLLM{
    static async chat(model:string,message: Messages):Promise <LlmResponse>{ 
        const response  = await anthropic.messages.create({
            model :model,
            max_tokens:1024,
            messages: message.map((message)=>({
                content:message.content,
                role:message.role
            }))
        })
        return {
            inputTokensConsumed:response.usage.input_tokens!,
            outputTokensConsumed:response.usage?.output_tokens!,
            completions:{
                choices:response.content.map(content=>({
                    message:{
                        content: (content as TextBlock).text
                    }
                }))
            }
        }
        
    }
}