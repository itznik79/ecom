import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req) => req?.cookies?.refresh_token,
            ]),
            secretOrKey: process.env.JWT_REFRESH_SECRET || "asjkdsahgdhasgjhsad",
        });
    }

    validate(payload) {
        return payload;
    }
}
