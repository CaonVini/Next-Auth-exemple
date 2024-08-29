import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { db as prisma} from "@/lib/db"
import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Nome Completo", type: "text", placeholder: "nome completo" },
                email: { label: "Email", type: "email", placeholder: "example@example.com" },
                password: { label: "Senha", type: "password", placeholder: "senha" },
            },
            async authorize(credentials, req) : Promise<any> {
                console.log("Authorize method", credentials)


                if(!credentials?.email || !credentials?.password) throw new Error("Dados de Login necessarios")

                const user = await prisma.user.findUnique({
                    where:{
                        email: credentials?.email
                    }
                })

                console.log("USER", user)

                if(!user || !user.hashedPassword) {
                    throw new Error("Usuários não registrado através de credenciais")
                }

                const matchPassword = await bcrypt.compare(credentials.password, user.hashedPassword)
                if(!matchPassword)
                    throw new Error("Senha incorreta")

                return user
            }
        }),

    ],
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
        maxAge: 30 * 60,
    },
};