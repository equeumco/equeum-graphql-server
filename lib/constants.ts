export enum UserRoles {
    UNVERIFIED = 'UNVERIFIED',
    LIMITED = 'LIMITED',
    USER = 'USER',
    BETA_TESTER = 'BETA_TESTER',
    ADMIN_VIEWER = 'ADMIN_VIEWER',
    ADMIN = 'ADMIN',
    MACHINE = 'MACHINE',
};
export const NODE_ENV = process.env.NODE_ENV || 'dev';
