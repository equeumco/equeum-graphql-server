import AuthenticatedUserData from './AuthenticatedUserData';
/**
 * Context object that will be passed to all resolvers.
 */
declare class EqueumContext {
    /** Object containing the data of user that is making the request. */
    user?: AuthenticatedUserData;
    /**
     * Authentication token to be used when calling other services.
     */
    authToken: string;
    /**
     * Authentication header to be user when calling other services. Is
     * the same as authToken except contains full header with 'Bearer '
     * prepended.
     */
    authHeader: string;
}
export default EqueumContext;
