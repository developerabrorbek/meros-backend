import { GenderType, RolesType } from '@prisma/client';

export declare interface UpdateUserRequest {
  id: string;
  name?: string;
  gender?: GenderType;
  email?: string;
  username?: string;
  password?: string;
  phone?: string;
  role?: RolesType;
  image?: string;
  year?: string;
}
