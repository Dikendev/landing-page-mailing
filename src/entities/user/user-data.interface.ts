import { User as UserModel } from '@prisma/client';

export interface UserData extends User {}

export type User = Omit<UserModel, 'id' | 'createdAt'>;
