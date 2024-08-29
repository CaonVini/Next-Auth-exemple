import { UserRegisterForm } from "@/components/user-register"
import Link from "next/link"

export default function Component() {
  return (
    <div className="mx-auto max-w-sm space-y-6 h-screen w-screen flex flex-col justify-center  ">
      <div className="space-y-2 text-center ">
        <h1 className="text-3xl font-bold">Criar nova conta</h1>
        <p className="text-muted-foreground">Preencha os dados abaixo para criar sua conta</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <UserRegisterForm />
        </div>
        <Link href="/auth/login" className="inline-block w-full text-center text-sm underline" prefetch={false}>
          Ja possuo conta
        </Link>
      </div>
    </div>
  )
}