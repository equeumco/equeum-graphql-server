import { ValidationError } from 'apollo-server';
/**
 * Error to be thrown when the uswer is not an owner of the
 * entity he is trying to access or change.
 */
declare class NotAnOwnerError extends ValidationError {
    constructor();
}
export default NotAnOwnerError;
