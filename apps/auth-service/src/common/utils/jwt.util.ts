import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.config';

export function generateAccessToken(payload: object): string {
  return jwt.sign(
    payload,
    jwtConfig.accessToken.secret,
    jwtConfig.accessToken.options,
  );
}

export function generateRefreshToken(payload: object): string {
  return jwt.sign(
    payload,
    jwtConfig.refreshToken.secret,
    jwtConfig.refreshToken.options,
  );
}
