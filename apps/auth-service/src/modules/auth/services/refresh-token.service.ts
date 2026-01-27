import { RefreshToken } from '../../../infrastructure/database/models/refresh-token-model';
import { hashPassword } from '../../../common/utils/hash.util';

export async function saveRefreshToken(
  userId: string,
  token: string,
  expiresAt: Date,
) {
  const tokenHash = await hashPassword(token);

  await RefreshToken.create({
    user_id: userId,
    token_hash: tokenHash,
    expires_at: expiresAt,
  });
}
