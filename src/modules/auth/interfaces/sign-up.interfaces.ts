import { GenderType } from '@prisma/client';

export declare interface SingupRequest {
  name: string;
  phone: string;
  gender: GenderType;
  email: string;
  username: string;
  password: string;
  userAgent?: string;
  ip?: string;
}

export declare interface SignUpResponse {
  accessToken: string;
  refreshToken: string;
}
