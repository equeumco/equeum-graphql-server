"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
/**
 * Error to be thrown when the uswer is not an owner of the
 * entity he is trying to access or change.
 */
class NotAnOwnerError extends apollo_server_express_1.ValidationError {
    constructor() {
        super('You must be an owner to perform this operation.');
    }
}
exports.default = NotAnOwnerError;
//# sourceMappingURL=NotAnOwnerError.js.map