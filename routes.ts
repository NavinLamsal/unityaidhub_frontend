/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 * 
 * 
 */
export const publicRoutes = [
    "/",
    "/blog",
    // "/browse-a-campaign",
    "/contactus",
    "/browse-a-campaign/detailpage"
  ];
  
  export const protectedRoutes = [
    "/dashboard",
    "/browse-a-campaign",
    // add other protected routes here
  ];

  /**
   * An array of routes that are used for authentication
   * These routes will redirect logged in users to /dashboard
   * @type {string[]}
   */
  export const authRoutes = [
    "/signin",
    "/signup",
    "/auth/error",
    "/forgetPassword",
    "/newpassword"
  ];
  
  /**
   * The prefix for API authentication routes
   * Routes that start with this prefix are used for API authentication purposes
   * @type {string}
   */
  export const apiAuthPrefix = "/api/auth";
  
  /**
   * The default redirect path after logging in
   * @type {string}
   */
  export const DEFAULT_LOGIN_REDIRECT = "/dashboard";