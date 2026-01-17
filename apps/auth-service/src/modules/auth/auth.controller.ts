import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import { registerSchema } from './validators/register.schema';
import { loginSchema } from './validators/login.schema';
// import { UseGuards, Get, Req } from '@nestjs/common';
// import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/send-otp')
  async sendOtp(@Body() dto: SendOtpDto) {
    await this.authService.sendRegisterOtp(dto.email);
    return { message: 'OTP sent successfully' };
  }

  @Post('register')
  async register(
    @Body(new JoiValidationPipe(registerSchema)) body: any,
  ) {
    return this.authService.register(body);
  }

  @Post('login')
async login(
  @Body(new JoiValidationPipe(loginSchema)) body: any,
) {
  return this.authService.login(body);
}

// @UseGuards(JwtAuthGuard)
// @Get('profile')
// getProfile(@Req() req) {
//   return req.user;
// }

}
