import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const session = request.cookies.get('JSESSIONID') // or your session cookie name
  console.log("This is the session",session)
  if (session) {
    return NextResponse.json({ isAuthenticated: true })
  } else {
    return NextResponse.json({ isAuthenticated: false })
  }
}
