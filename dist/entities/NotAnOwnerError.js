"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
/**
 * Error to be thrown when the uswer is not an owner of the
 * entity he is trying to access or change.
 */
class NotAnOwnerError extends graphql_1.GraphQLError {
    constructor() {
        super('You must be an owner to perform this operation.', { extensions: { code: 'GRAPHQL_VALIDATION_FAILED' } });
    }
}
exports.default = NotAnOwnerError;
//# sourceMappingURL=NotAnOwnerError.js.map