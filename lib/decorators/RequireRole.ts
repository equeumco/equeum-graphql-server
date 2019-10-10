import { createMethodDecorator } from 'type-graphql';
import { EqueumContext } from '../types';
import { AuthenticationError } from 'apollo-server-express';

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
const RequireRole = (roles: string | string[]) => {
  return createMethodDecorator<EqueumContext>(async ({ context }, next) => {
    if (Array.isArray(roles)) {
      if (roles.indexOf(context.user.role) === -1) {
        throw new AuthenticationError(`To access this resource you need to have ${roles.map(role => `'${role}'`).join(' or ')} role.`);
      }
    } else {
      if (context.user.role !== roles) {
        throw new AuthenticationError(`To access this resource you need to have '${roles}' role.`);
      }
    }
    return next();
  });
};

export default RequireRole;
