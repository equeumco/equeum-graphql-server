import { ValidationError } from 'apollo-server-express';

/**
 * Error to be thrown when the uswer is not an owner of the
 * entity he is trying to access or change.
 */
class NotAnOwnerError extends ValidationError {
    constructor() {
        super('You must be an owner to perform this operation.');
    }
}

export default NotAnOwnerError;
