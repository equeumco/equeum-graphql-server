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
declare const RequireRole: (roles: string | string[]) => MethodDecorator;
export default RequireRole;
