import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { ROLES } from "@/lib/auth/roles";

const UNAUTHORIZED_PATH = "/unauthorized";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token?.role !== ROLES.ADMIN) {
    const unauthorizedUrl = request.nextUrl.clone();
    unauthorizedUrl.pathname = UNAUTHORIZED_PATH;
    unauthorizedUrl.search = "";
    return NextResponse.redirect(unauthorizedUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};