import type { NextRequest } from 'next/server';

import { COOKIE_ID_TOKEN } from '@src/utils/session';

export async function middleware(request: NextRequest) {
  const currentUser = request.cookies.get(COOKIE_ID_TOKEN)?.value;

  if (request.nextUrl.pathname.startsWith('/signin') && !!currentUser) {
    return Response.redirect(new URL('/dashboard', request.url));
  }

  if (request.nextUrl.pathname.startsWith('/dashboard') && !currentUser) {
    return Response.redirect(new URL('/signin', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};