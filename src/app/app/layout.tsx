import { PropsWithChildren } from 'react'

export default async function Layout({ children }: PropsWithChildren) {


  return (
    <div className="h-screen flex justify-center items-center">
      <main>{children}</main>
    </div>
  )
}