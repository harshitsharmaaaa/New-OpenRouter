import { AuthModel } from "./models";
import {prisma } from "db";
import { jwt } from '@elysiajs/jwt'
export abstract class AuthService{
    static async signUp(email:string,password:string):Promise<string>{
        const user = await prisma.user.create({
            data:{
                email,
                password: await Bun.password.hash(password)
            }
        })
        return user.id.toString();
    }

    static async signIn(email:string,password:string):Promise<{correctCredentials:boolean,userId?:string}>{
        const user = await prisma.user.findFirst({
            where:{
                email:email
            }
        })

        if(!user){
            return {correctCredentials:false};
        }
        const isPasswordCorrect = await Bun.password.verify(password,user.password);
        if(!isPasswordCorrect){
            return {correctCredentials:false};
        }
        return {correctCredentials:true,userId:user.id.toString()}; 
    }

   static async getUserDetails(id:number){
        return prisma.user.findFirst({
            where:{
                id:id
            }
        })
   }
}