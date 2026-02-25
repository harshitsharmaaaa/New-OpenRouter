import {prisma} from "db";
import { ApiKeyModel } from "./models";
const API_KEY_LENGTH = 20;
const ALPHABET_SET = "ejsfcioajwefk09290489ujdksmjw0120284ndwcjemjb23rji";
export abstract class ApiKeyService{

    static  createRandomApiKey(){
        let suffix ="";
        for(let i=0;i<API_KEY_LENGTH;i++){
            suffix+=ALPHABET_SET[Math.floor(Math.random()*ALPHABET_SET.length)];    
        }
        return `sK-or-v1-${suffix}`;
    }


    static async createApiKey(name:string,userId:number):Promise<{id:string,apikey:string}>{
        const apiKey = this.createRandomApiKey();
        const apiKeyDb = await prisma.apiKey.create({
            data:{
                name,
                api_key:apiKey,
                user_id:userId,
            }
        })
        return {
            id:apiKeyDb.id.toString(),
            apikey:apiKey
        }
    }

    static async UpdateApiKeyDisabled(apikeyId: number, userId: number): Promise<void> {
        const existing = await prisma.apiKey.findFirst({
            where: {
                id: apikeyId,
                user_id: userId,
            },
        });

        if (!existing) {
            throw new Error("API key not found");
        }

        await prisma.apiKey.update({
            where: {
                id: apikeyId,
                user_id: userId,
            },
            data: {
                // Toggle current state (enabled <-> disabled)
                disabled: !existing.disabled,
            },
        });
    }
    

    static async deleteApiKey(id:number,userId:number){
        await prisma.apiKey.update({
            where:{
                id,
                user_id:userId
            },
            data:{
                deleted:true
            }
        })
    }

    static async getApiKeys(userId:number){
        const apikeys = await prisma.apiKey.findMany({
            where:{
                user_id:userId,
                deleted:false
            }
        })

        return apikeys.map(apikey=>({
            id:apikey.id.toString(),
            name:apikey.name,
            apiKey:apikey.api_key,
            lastUsed:apikey.lastUsed ?? new Date(),
            creditConsumed:apikey.creditsConsumed,
            disabled:apikey.disabled,
        }))
    }
}