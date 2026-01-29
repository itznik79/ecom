import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.config';
import { isAccessTokenValid } from '../utils/access-token-redis.util';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Missing token');
    }

    const token = authHeader.replace('Bearer ', '');

    let payload: JwtPayload;
    try {
      payload = jwt.verify(token, jwtConfig.accessToken.secret) as JwtPayload;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    const isValid = await isAccessTokenValid(
      payload.sub,
      payload.jti,
    );

    if (!isValid) {
      throw new UnauthorizedException('Token expired');
    }

    req.user = payload;
    return true;
  }
}
