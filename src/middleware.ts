import { NextRequest, NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith('/auth') && token) {
    return NextResponse.redirect(new URL('/app', request.url))
  }

  if (!pathname.startsWith('/auth') && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (pathname.startsWith('/api')) {
    return NextResponse.json({ error: "API routes cannot be accessed directly from the browser." }, { status: 403 })
  }

  if (!pathname.startsWith('/auth') && !pathname.startsWith('/app') && !pathname.startsWith('/api')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    } else {
      return NextResponse.redirect(new URL('/app', request.url))
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}