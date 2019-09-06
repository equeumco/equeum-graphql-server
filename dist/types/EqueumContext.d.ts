import AuthenticatedUserData from './AuthenticatedUserData';
/**
 * Context object that will be passed to all resolvers.
 */
declare class EqueumContext {
    /** Object containing the data of user that is making the request. */
    user?: AuthenticatedUserData;
    /**
     * Raw authentication header ('Bearer JWTJWTJWT') to be passed
     * along when calling other services
     */
    authHeader: string;
}
export default EqueumContext;
