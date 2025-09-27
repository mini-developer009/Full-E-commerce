import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const pathname = req.nextUrl.pathname;

  const isAuth = !!accessToken && !!refreshToken;
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  const publicPaths = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/favicon.ico",
    "/verify-account",
    "/_next/",
    "/images/digital-graph-image.avif",
  ];

  // If user is logged in and tries to access login/signup, redirect
  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow public paths
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // If not authenticated, redirect to login
  if (!isAuth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ If authenticated, check if user has a store
  if (accessToken) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shop/my-shop`, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });

      const data = await res.json();

      if (!data.success || !data.data || data.data.length === 0) {
        // No store → redirect to create-store
        if (pathname !== "/create-store") {
          return NextResponse.redirect(new URL("/create-store", req.url));
        }
      }
    } catch (error) {
      console.error("Error checking store:", error);
      return NextResponse.redirect(new URL("/create-store", req.url));
    }
  }

  // Otherwise allow
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt).*)"],
};
