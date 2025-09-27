// app/api/logout/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies() // await the promise

  // Delete cookies using the new API
  cookieStore.delete({ name: 'accessToken', path: '/' })
  cookieStore.delete({ name: 'refreshToken', path: '/' })

  return NextResponse.json({ message: 'Logged out successfully' })
}
