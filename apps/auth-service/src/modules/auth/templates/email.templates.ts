export function getVerificationEmailTemplate(otp: string): string {
  return `
    <h2>Email Verification</h2>
    <p>Your OTP is:</p>
    <h1>${otp}</h1>
    <p>This OTP will expire in 5 minutes.</p>
  `;
}

export function getForgotPasswordEmailTemplate(otp: string): string {
  return `
    <h2>Reset Password</h2>
    <p>Your OTP to reset your password is:</p>
    <h1>${otp}</h1>
    <p>This OTP will expire in 5 minutes. If you did not request this, please ignore this email.</p>
  `;
}
