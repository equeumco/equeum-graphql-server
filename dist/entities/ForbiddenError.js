"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
/**
 * Error to be thrown when the Validation not correct
 */
class ForbiddenError extends graphql_1.GraphQLError {
    constructor(message) {
        super(message || 'You haven\'t got enough rights to access this account data.', { extensions: { code: 'FORBIDDEN' } });
    }
}
exports.default = ForbiddenError;
//# sourceMappingURL=ForbiddenError.js.map