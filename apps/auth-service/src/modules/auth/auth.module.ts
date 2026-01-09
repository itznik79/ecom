import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import {Module} from "@nestjs/common";
import { FirebaseStrategy } from "./strategies/firebase.strategy";
import { GoogleStrategy } from "./strategies/google.strategy";
import { JwtRefreshStrategy } from "./strategies/jwt-refresh.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
  ],
//   controllers: [AuthController],
  providers: [
    // AuthService,
    // TokenService,
    // OtpService,

    JwtStrategy,
    JwtRefreshStrategy,
    GoogleStrategy,
    FirebaseStrategy,
  ],
})
export class AuthModule {}
