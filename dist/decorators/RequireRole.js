"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("../entities");
const type_graphql_1 = require("type-graphql");
/**
 * Decorator to be used for access control. By default we suppose that
 * all GraphQL resources are accessible to all users. If we want to limit
 * the access to specific resource, we can add RequireRole decorator to
 * resolver annotation. Valid roles are 'UNVERIFIED', 'LIMITED', 'USER',
 * 'ADMIN', and 'MACHINE', you can also
 * supply multiple roles that are allowed to access this resource by providing
 * an array like ['ADMIN', 'MACHINE'].
 *
 * @param roles - role or roles needed to acces this resource
 */
const RequireRole = (roles) => {
    return (0, type_graphql_1.createMethodDecorator)(({ context }, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (Array.isArray(roles)) {
            if (roles.indexOf(context.user.role) === -1) {
                throw new entities_1.UnAuthenticatedError(`To access this resource you need to have ${roles.map(role => `'${role}'`).join(' or ')} role.`);
            }
        }
        else {
            if (context.user.role !== roles) {
                throw new entities_1.UnAuthenticatedError(`To access this resource you need to have '${roles}' role.`);
            }
        }
        return next();
    }));
};
exports.default = RequireRole;
//# sourceMappingURL=RequireRole.js.map