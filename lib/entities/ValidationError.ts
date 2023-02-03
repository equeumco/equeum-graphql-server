
import { GraphQLError } from 'graphql';

/**
 * Error to be thrown when the Validation not correct
 */
class ValidationError extends GraphQLError {
    constructor(message?: string) {
        super(message || 'Invalid operation.', { extensions: { code: 'GRAPHQL_VALIDATION_FAILED' } });
    }
}

export default ValidationError;
