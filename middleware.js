// import authConfig from "@/auth.config";
import configuration from "@/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(configuration)

import {
    publicRoutes,
    authRoutes,
    apiAuthPrefix,
    DEFAULT_LOGIN_REDIRECT,
    authenticatedRoutes,
    dynamicRoutes,
} from "@/routes";

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isAuthenticatedRoute = authenticatedRoutes.includes(nextUrl.pathname);
    const isDynamicRoute = dynamicRoutes.some((route) => nextUrl.pathname.includes(route));

    // Allow access to public routes
    if(isApiAuthRoute){
        return null;
    }

    // If the route is in AuthRoutes and the user is logged-in, redirect to the default login route
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return null;
    }

    // If the route is not public and the user is not logged-in, redirect to the sign-in page
    if (isLoggedIn && isPublicRoute) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    if (!isLoggedIn && (isAuthenticatedRoute || isDynamicRoute)) {
        return Response.redirect(new URL("/auth/sign-in", nextUrl));
    }

    return null;
})

export const config ={
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};