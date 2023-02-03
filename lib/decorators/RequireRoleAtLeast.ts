import { createMethodDecorator } from 'type-graphql';
import { EqueumContext } from '../types';
import { NODE_ENV, UserRoles } from '../constants';
import { UnAuthenticatedError } from '../entities';

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

const VALID_ROLES: string[] = Object.values(UserRoles);

const RequireRoleAtLeast = (minimumRole: string) => {
    return createMethodDecorator<EqueumContext>(async ({ context }, next) => {
        if (NODE_ENV === 'test') return next();
        const minimumRoleIndex = VALID_ROLES.indexOf(minimumRole);
        const roleIndex = VALID_ROLES.indexOf(context.user.role);
        if (minimumRoleIndex === -1) {
            throw new UnAuthenticatedError(`${minimumRole} is not a valid role.`);
        }
        if (roleIndex === -1) {
            throw new UnAuthenticatedError(`${context.user.role} is not a valid role.`);
        }
        if (minimumRoleIndex > roleIndex) {
            throw new UnAuthenticatedError(`To access this resource, you need to have at least ${minimumRole} role.`);
        }
        return next();
    });
};

export default RequireRoleAtLeast;
