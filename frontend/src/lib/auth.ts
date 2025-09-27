"use server";
// lib/auth.ts
import { cookies } from 'next/headers';

export const setAuthCookies = async (accessToken: string, refreshToken: string) => {
  const cookieStore = await cookies(); // ✅ await here

  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60, // 1 hour
  });

  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
};
