/**
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"];
/**
 * Array of routes that are used to authenticate
 * These routes require authentication
 * @type {string[]}
 */
export const authRoutes = ["auth/login", "auth/register"];
// /**
//  * Array of routes that are used to authenticate
//  * These routes require authentication
//  * @type {string[]}
//  */
// export const authRoutes = ["auth/", ""];
/**
 * The prefix of Api Authentication and database interactions
 * These routes require authentication
 * @type {string}
 */
export const apiAuthPrefix = "api/auth";
/**
 * The default redirect after loging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
