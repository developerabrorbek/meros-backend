import { GenderType, RolesType } from '@prisma/client';

export declare interface UserCreateRequest {
  name: string;
  gender: GenderType;
  email: string;
  username: string;
  password: string;
  phone: string;
  role: RolesType;
}
