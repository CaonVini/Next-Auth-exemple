import Link from "next/link"
import { UserLoginForm } from "@/components/user-login"

export default function Component() {
  return (
    <div className="mx-auto max-w-sm space-y-6 h-screen w-screen flex flex-col justify-center  ">
      <div className="space-y-2 text-center ">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-muted-foreground">Entre com seu email para acessar sua conta</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <UserLoginForm />
        </div>
        <Link href="/auth/register" className="inline-block w-full text-center text-sm underline" prefetch={false}>
          Criar nova conta
        </Link>
      </div>
    </div>
  )
}