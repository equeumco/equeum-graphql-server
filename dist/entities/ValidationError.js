"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
/**
 * Error to be thrown when the Validation not correct
 */
class ValidationError extends graphql_1.GraphQLError {
    constructor(message) {
        super(message || 'Invalid operation.', { extensions: { code: 'GRAPHQL_VALIDATION_FAILED' } });
    }
}
exports.default = ValidationError;
//# sourceMappingURL=ValidationError.js.map