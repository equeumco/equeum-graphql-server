import { UnAuthenticatedError } from '../entities';
import { createMethodDecorator } from 'type-graphql';
import { EqueumContext } from '../types';

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
const RequireRole = (roles: string | string[]) => {
    return createMethodDecorator<EqueumContext>(async ({ context }, next) => {
        if (Array.isArray(roles)) {
            if (roles.indexOf(context.user.role) === -1) {
                throw new UnAuthenticatedError(`To access this resource you need to have ${roles.map(role => `'${role}'`).join(' or ')} role.`);
            }
        } else {
            if (context.user.role !== roles) {
                throw new UnAuthenticatedError(`To access this resource you need to have '${roles}' role.`);
            }
        }
        return next();
    });
};

export default RequireRole;
