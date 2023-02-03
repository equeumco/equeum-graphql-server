import { GraphQLError } from 'graphql';
/**
 * Error to be thrown when the uswer is not Authenticated
 */
declare class UnAuthenticatedError extends GraphQLError {
    constructor(message?: string);
}
export default UnAuthenticatedError;
