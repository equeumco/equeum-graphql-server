"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
/**
 * Error to be thrown when the uswer is not Authenticated
 */
class UnAuthenticatedError extends graphql_1.GraphQLError {
    constructor(message) {
        super(message || 'You are not authenticated to access this endpoint.', { extensions: { code: 'UNAUTHENTICATED' } });
    }
}
exports.default = UnAuthenticatedError;
//# sourceMappingURL=UnAuthenticatedError.js.map