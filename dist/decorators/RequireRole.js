"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const apollo_server_express_1 = require("apollo-server-express");
/**
 * Decorator to be used for access control. By default we suppose that
 * all GraphQL resources are accessible to all users. If we want to limit
 * the access to specific resource, we can add RequireROle decorator to
 * resolver annotation. Valid roles are 'ADMIN' or 'MACHINE', you can also
 * supply multiple roles that are allowed to access this resource by providing
 * an array like ['ADMIN', 'MACHINE'].
 *
 * @param roles - role or roles needed to acces this resource
 */
// tslint:disable-next-line:variable-name
const RequireRole = (roles) => {
    return type_graphql_1.createMethodDecorator(({ context }, next) => __awaiter(this, void 0, void 0, function* () {
        if (Array.isArray(roles)) {
            if (roles.indexOf(context.user.role) === -1) {
                throw new apollo_server_express_1.AuthenticationError(`To access this resource you need to have ${roles.map(role => `'${role}'`).join(' or ')} role.`);
            }
        }
        else {
            if (context.user.role !== roles) {
                throw new apollo_server_express_1.AuthenticationError(`To access this resource you need to have '${roles}' role.`);
            }
        }
        return next();
    }));
};
exports.default = RequireRole;
//# sourceMappingURL=RequireRole.js.map