/**
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/"];

/**
 * Array of routes that require authentication
 * @type {string[]}
 */
export const authRoutes: string[] = ["/auth/login", "/auth/signup"];

/**
 * The prefix of Api Authentication and database interactions
 * These routes require authentication
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/dashboard";
