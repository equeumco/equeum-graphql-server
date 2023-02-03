
import { GraphQLError } from 'graphql';

/**
 * Error to be thrown when the Validation not correct
 */
class ForbiddenError extends GraphQLError {
    constructor(message?: string) {
        super(message || 'You haven\'t got enough rights to access this account data.', { extensions: { code: 'FORBIDDEN' } });
    }
}

export default ForbiddenError;
