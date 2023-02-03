import { GraphQLError } from 'graphql';
/**
 * Error to be thrown when the Validation not correct
 */
declare class ValidationError extends GraphQLError {
    constructor(message?: string);
}
export default ValidationError;
