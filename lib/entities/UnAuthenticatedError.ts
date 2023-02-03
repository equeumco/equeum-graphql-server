
import { GraphQLError } from 'graphql';

/**
 * Error to be thrown when the uswer is not Authenticated
 */
class UnAuthenticatedError extends GraphQLError {
    constructor(message?: string) {
        super(message || 'You are not authenticated to access this endpoint.', { extensions: { code: 'UNAUTHENTICATED' } });
    }
}

export default UnAuthenticatedError;
