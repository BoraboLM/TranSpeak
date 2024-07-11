/**
 *  Array of routes that are public and do not need authentication
 * @type {String[]}
 */
export const publicRoutes = [
    '/',
    '/auth/new-verification'
]

/**
 * Array of routes that used for Authentication.
 * These Routes will redirect users to /home if authenticated
 * @type {String[]}
 */
export const authRoutes = [
    '/auth/sign-in',
    '/auth/sign-up',
    '/auth/error',
    '/auth/reset',
    '/auth/new-password',
]

/**
 * The Prefix for API authentication routes.
 * Routes that start with this prefix are used for authentication purpose only
 * @type {String}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default route after successful login
 * @type {String}
 */
export const DEFAULT_LOGIN_REDIRECT = "/home";


/**
 * These array of routes needs to be authenticated to access
 * @type {String[]}
 */
export const authenticatedRoutes = [
    "/home",
    "/places",
    "/learn",
    "/dictionary",
    "/phrasebook",
    "/ilocano",
    "/pangasinan",
    "/dashboard",
    "/settings",
    "/dashboard/users",
    "/dashboard/learn",
    "/dashboard/learn/phrasebook",
    "/dashboard/learn/pangasinan",
    "/dashboard/learn/ilocano",
    "/dashboard/places",,
    "/dashboard/dictionary",
    "/dashboard/system-log",
]

export const dynamicRoutes = [
    '/learn/pangasinan',
    '/learn/ilocano',
]

/**
 * Routes Starting from this url are for Admin only
 * @type {String[]}
 */
export const AdminRoutes = [
    "/dashboard",
    "/dashboard/users",
    "/dashboard/learn",
    "/dashboard/places",
    "/dashboard/system-log",
    "/dashboard/dictionary",
    "/dashboard/maintenance",
]
