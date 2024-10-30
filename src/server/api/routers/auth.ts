import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { PrismaError } from "~/types/global";
import { Prisma } from "@prisma/client";
import Email from "next-auth/providers/email";
import { hash } from "argon2";

const RegisterCredentials = z.object({
    name: z.string(),
    phone: z.string(),
    password: z.string(),  
    userType: z.string(),
    email:z.string(), 
});

export const authRouter = createTRPCRouter({
    register: publicProcedure
    .input(RegisterCredentials)
    .mutation(async ({ctx,input}) => {
        try{
          const userData = await ctx.prisma.user.create({
            data:{
                name:input.name,
                password: await hash(input.password),
                phone: input.phone,
                userType: input.userType,
                email: input.email
            }
          })
        return userData;
        }catch(error:unknown){
             const prismaError = error as PrismaError;
             const regularError = error as Error;
             if (regularError.message == "invalid email") {
                throw new Error("invalid email format");
              }
              if (
                prismaError.code === "P2002" &&
                prismaError.meta?.target?.includes("phone")
              ) {
                throw new Error("Phone number is already registered");
              }
      
              if (
                prismaError.code === "P2002" &&
                prismaError.meta?.target?.includes("email")
              ) {
                throw new Error("Email is already registered");
              }
      
              if (
                error instanceof Prisma.PrismaClientUnknownRequestError &&
                error.message.includes("Failed to connect")
              ) {
                throw new Error("Internet connection failed!");
              }
      
              throw new Error("Registration failed!");
        }
    })
})