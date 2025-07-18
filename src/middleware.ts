/* eslint-disable no-duplicate-imports */
// This file should be placed at the root level of your project, alongside package.json
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrivateRoutes, PublicRoutes } from "./components/Header/routes-ui";

export async function middleware(request: NextRequest) {
    // Get token from cookies
    const token = request.cookies.get("auth-token")?.value;

    // Define protected paths that require authentication
    const authRequiredPaths = [PrivateRoutes.DASHBOARD];

    const path = request.nextUrl.pathname;

    // Check if the current path requires authentication
    const isProtectedPath = authRequiredPaths.some((pp) => path.startsWith(pp));

    if (isProtectedPath && !token) {
        // No token found, redirect to login
        return NextResponse.redirect(new URL(PublicRoutes.NAO_AUTORIZADO, request.url));
    }

    return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [`${PrivateRoutes.DASHBOARD}/:path*`],
};
