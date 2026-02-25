import { t } from 'elysia'
export namespace ApiKeyModel {
    export const createAPiKeySchema = t.Object({
        name:t.String()
    })

    export type createAPiKeySchema = typeof createAPiKeySchema.static;

    export const createApiKeyReponse = t.Object({
        id:t.String(),
        apikey:t.String()
    })

    export const UpdateApiKeySchema = t.Object({
        id:t.String(),
        disabled:t.Boolean()
    })

    export type UpdateApiKeySchema = typeof UpdateApiKeySchema.static;

    export const UpdateApiKeyReponseSchema = t.Object({
        message:t.Literal("Updated API Key Sucessfully")
    })

    export type UpdateApiKeyReponseSchema = typeof UpdateApiKeyReponseSchema.static;


    export const disableApiKeyReponseFailedSchema = t.Object({
        message:t.Literal("Updating Api key Unsuccesfull")
    })

    export type disableApiKeyReponseFailedSchema = typeof disableApiKeyReponseFailedSchema.static; 


    export const deleteApiKeyResponseSchema = t.Object({
        message:t.Literal("API Key deleted")
    })

    export type deleteApiKeyResponseSchema = typeof deleteApiKeyResponseSchema.static;


    export const deleteApiKeyFailedResponseSchema = t.Object({
        message:t.Literal("deleting API Key failed")
    })

    export type deleteApiKeyFailedResponseSchema = typeof deleteApiKeyFailedResponseSchema.static;


    export const getApiKeysResponseSchema = t.Object({
        apiKeys:t.Array(t.Object({
            id:t.String(),
            name:t.String(),
            apiKey:t.String(),
            lastUsed:t.Date(),
            creditConsumed:t.Number(),
            disabled:t.Boolean()
        }))
        
    });

    export type getApiKeysResponseSchema = typeof getApiKeysResponseSchema.static;
}