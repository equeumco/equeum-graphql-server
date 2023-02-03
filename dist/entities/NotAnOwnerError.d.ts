import { GraphQLError } from 'graphql';
/**
 * Error to be thrown when the uswer is not an owner of the
 * entity he is trying to access or change.
 */
declare class NotAnOwnerError extends GraphQLError {
    constructor();
}
export default NotAnOwnerError;
