import { Elysia , Cookie } from "elysia";
import {AuthModel} from "./models";
import {AuthService} from "./service";
import jwt from "@elysiajs/jwt";

export const auth = new Elysia({prefix:"/auth"})
    .use(
        jwt({
            name:"jwt",
            secret:process.env.JWT_SECRET!
        })
    )
    .post("/sign-up",async({body,status})=>{
        try {
            const userId  = await AuthService.signUp(body.email,body.password);
            return {
                id:userId
            }
        } catch (error) { 
            return status(400,{
                message:"Error while signing up"
            })
            
        }
    },{
        body:AuthModel.signupSchema,
        response:{
            200:AuthModel.signupResponseSchema,
            400:AuthModel.signupFailedResponseSchema
        }
    })

    .post("/sign-in", async ({ jwt, body, status, cookie: { auth } }) => {
        const { correctCredentials, userId } = await AuthService.signIn(body.email, body.password)
        if (correctCredentials && userId) {
            const token = await jwt.sign({ userId })
            if (!auth) {
                auth = new Cookie("auth", {});
            }

            auth.set({
                value: token,
                httpOnly: true,
                maxAge: 7 * 86400,
            })

            return {
                message: "Signed in successfully"
            }
        } else {
            return status(403, {
                message: "Incorrect credentials"
            })
        }
    }, {
        body: AuthModel.signinSchema,
        response: {
            200: AuthModel.signinResponseSchema,
            403: AuthModel.signinFailureSchema
        }
    })
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
    .get("/profile",async({userId,status})=>{
        const userData = await AuthService.getUserDetails(Number(userId));
        if(!userData){
            return status(411,{
                message:"Error while fetching user details"
            })
        }
        else{
            return userData;
        }
    },{

        response:{
            200:AuthModel.profileResponseSchema,
            411:AuthModel.profileResponseErrorSchema
        }
    })

