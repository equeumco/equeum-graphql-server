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
const type_graphql_1 = require("type-graphql");
const constants_1 = require("../constants");
const entities_1 = require("../entities");
/**
 * Decorator to be used for access control. By default we suppose that
 * all GraphQL resources are accessible to all users. If we want to limit
 * the access to users who have higher roles than specific role,
 * we can add RequireRoleAtLeast decorator to resolver annotation.
 * For example, if we want to limit access to specific resource for
 * users who have at least USER role, we can use this decorator like
 * RequireRoleExact('USER'), which is equivalent to
 * RequireRole(['UNVERIFIED', 'LIMITED', 'USER']).
 *
 * @params role - minimum role needed to access this resource.
 */
const VALID_ROLES = Object.values(constants_1.UserRoles);
const RequireRoleAtLeast = (minimumRole) => {
    return (0, type_graphql_1.createMethodDecorator)(({ context }, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (constants_1.NODE_ENV === 'test')
            return next();
        const minimumRoleIndex = VALID_ROLES.indexOf(minimumRole);
        const roleIndex = VALID_ROLES.indexOf(context.user.role);
        if (minimumRoleIndex === -1) {
            throw new entities_1.UnAuthenticatedError(`${minimumRole} is not a valid role.`);
        }
        if (roleIndex === -1) {
            throw new entities_1.UnAuthenticatedError(`${context.user.role} is not a valid role.`);
        }
        if (minimumRoleIndex > roleIndex) {
            throw new entities_1.UnAuthenticatedError(`To access this resource, you need to have at least ${minimumRole} role.`);
        }
        return next();
    }));
};
exports.default = RequireRoleAtLeast;
//# sourceMappingURL=RequireRoleAtLeast.js.map