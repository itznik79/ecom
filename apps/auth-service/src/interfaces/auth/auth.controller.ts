import { AuthService } from "./auth.service";

const authService = new AuthService();

export class AuthController {
  async sendOtp(req: any, res: any) {
    try {
      const { email, purpose } = req.body;

      const result =
        purpose === "reset_password"
          ? await authService.sendResetPasswordOtp(email)
          : await authService.sendSignupOtp(email);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }

  async verifyOtp(req: any, res: any) {
    try {
      const { email, otp, purpose } = req.body;

      if (purpose === "reset_password") {
        await authService.verifyResetPasswordOtp(email, otp);
      } else {
        await authService.verifySignupOtp(email, otp);
      }

      res.status(200).json({ success: true });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
}
