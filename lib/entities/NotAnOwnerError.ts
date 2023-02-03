
import { GraphQLError } from 'graphql';

/**
 * Error to be thrown when the uswer is not an owner of the
 * entity he is trying to access or change.
 */
class NotAnOwnerError extends GraphQLError {
    constructor() {
        super('You must be an owner to perform this operation.', { extensions: { code: 'GRAPHQL_VALIDATION_FAILED' } });
    }
}

export default NotAnOwnerError;
