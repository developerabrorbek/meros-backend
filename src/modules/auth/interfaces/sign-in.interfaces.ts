export declare interface SignInRequest {
  username: string;
  password: string;
  userAgent?: string
  ip?: string
}

export declare interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}