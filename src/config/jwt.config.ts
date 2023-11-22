import { registerAs } from '@nestjs/config';

declare interface JWTConfigOptions {
  accessTokenSecretKey: string;
  refreshTokenSecretKey: string;
  accessTokenExpireTime: number;
  refreshTokenExpireTime: string;
}

export const JWTConfig = registerAs<JWTConfigOptions>(
  'jwt',
  (): JWTConfigOptions => ({
    accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
    refreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY,
    accessTokenExpireTime: process.env.ACCESS_TOKEN_EXPIRE_TIME
      ? parseInt(process.env.ACCESS_TOKEN_EXPIRE_TIME, 10)
      : 6000,
    refreshTokenExpireTime: process.env.REFRESH_TOKEN_EXPIRE_TIME,
  }),
);
