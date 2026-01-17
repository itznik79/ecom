import { SignOptions } from 'jsonwebtoken';

export const jwtConfig = {
  accessToken: {
    secret: process.env.JWT_ACCESS_SECRET as string,
    options: {
      expiresIn: '15m',
    } as SignOptions,
  },
  refreshToken: {
    secret: process.env.JWT_REFRESH_SECRET as string,
    options: {
      expiresIn: '7d',
    } as SignOptions,
  },
};
