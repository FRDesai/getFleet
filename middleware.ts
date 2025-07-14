import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('JSESSIONID') 
  console.log('🧠 Middleware is running. Cookie:', token)
  const isLoggedIn = !!token
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname === '/'
  const isProtected = request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/profile') || request.nextUrl.pathname.startsWith('/settings')

  if (!isLoggedIn && isProtected) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile', '/settings', '/login'],
}
