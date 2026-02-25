import { Messages } from "../types";

export type LlmResponse = {
    completions:{
        choices:{
            message:{
                content:string
            }
        }[]
    },
    inputTokensConsumed: number,
    outputTokensConsumed: number
}

export class BaseLLM{
    static async chat(model:string,message:Messages):Promise<LlmResponse>{
        throw new Error("Not implemented chat function");
        
    }
}