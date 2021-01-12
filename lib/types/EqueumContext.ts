import Dataloader from 'dataloader';
import AuthenticatedUserData from './AuthenticatedUserData';

/**
 * Context object that will be passed to all resolvers.
 */
class EqueumContext {
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
    /**
   * User agent object includes requested user's information. i.e: browser and system information.
   */
    userAgent: object;
    /**
   * A flag which shows if request is coming from. i.e: internal-app.equeum.com
   */
    isInternal: boolean;
    /**
   * Dataloader instances for batching queries.
   */
    loaders: { [key: string]: Dataloader<string, any> };
}

export default EqueumContext;
