import { Elysia} from "elysia";
import { jwt } from '@elysiajs/jwt'
import { ApiKeyModel } from "./models";
import { ApiKeyService } from "./service";

export const app = new Elysia({prefix:"/apikeys"})
    .use(
        jwt({
            name:"jwt",
            secret:"process.env.JWT_SECRET!"
        })
    )
    .resolve(async ({ cookie: { auth }, status, jwt }) => {
        if (!auth) {
            return status(401, {
                message: "Unauthorized. Please sign in to manage API keys.",
            });
        }

        const decode = await jwt.verify(auth.value as string);

        if (!decode || !decode.userId) {
            return status(401, {
                message: "Invalid or expired session. Please sign in again.",
            });
        }

        return {
            userId: decode.userId as string,
        };
    })
    .post("/",async({userId,body})=>{
        const {apikey,id}= await ApiKeyService.createApiKey(body.name, Number(userId));

        return{
            id,
            apikey
        }
    },{
        body:ApiKeyModel.createAPiKeySchema,
        response:{
            200:ApiKeyModel.createApiKeyReponse
        }

    })

    .get("/",async({userId})=>{
        const apiKeys= await ApiKeyService.getApiKeys(Number(userId));

        return {
            apiKeys:apiKeys
        }
    },{
        response:{
            200:ApiKeyModel.getApiKeysResponseSchema
        }
    })

    .put("/", async ({ userId, body, status }) => {
        try {
            await ApiKeyService.UpdateApiKeyDisabled(
                Number(body.id),
                Number(userId),
            );
            return {
                message: "Updated API Key Sucessfully",
            };
        } catch (error) {
            return status(411, {
                message: "Updating Api key Unsuccesfull",
            });
        }
    }, {
        body:ApiKeyModel.UpdateApiKeySchema,
        response:{
            200:ApiKeyModel.UpdateApiKeyReponseSchema,
            411:ApiKeyModel.disableApiKeyReponseFailedSchema
        }
    })

    .delete("/:id",async({params:{id},userId,status})=>{
        try {
            await ApiKeyService.deleteApiKey(Number(id),Number(userId));
            return {
                message:"API Key deleted"
            }
        } catch (error) {
            return status(411,{
                message:"deleting API Key failed"
            })
        }
    },{ 
        response:{
            200:ApiKeyModel.deleteApiKeyResponseSchema,
            411:ApiKeyModel.deleteApiKeyFailedResponseSchema
        }
    })
    

