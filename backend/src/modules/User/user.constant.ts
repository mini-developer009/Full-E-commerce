import { TRole } from './user.interface';

export const USER_ROLE = {
    ADMIN: 'ADMIN',
    STAF:'STAF',
    USER:'USER',
    BUSINESS:'BUSINESS',
    SUPERADMIN:'SUPERADMIN',
} as const;
export const Role: TRole[] = ['ADMIN','STAF','SUPERADMIN','BUSINESS','USER'];