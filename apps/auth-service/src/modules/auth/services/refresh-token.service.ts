import { RefreshToken } from '../../../infrastructure/database/models/refresh-token-model';
import { hashPassword, comparePassword } from '../../../common/utils/hash.util';
import { Op } from 'sequelize';

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

export async function validateRefreshToken(
  userId: string,
  token: string,
): Promise<RefreshToken | null> {
  const tokens = await RefreshToken.findAll({
    where: {
      user_id: userId,
      expires_at: { [Op.gt]: new Date() }, // Not expired
    },
  });

  for (const storedToken of tokens) {
    const isValid = await comparePassword(token, storedToken.token_hash);
    if (isValid) {
      return storedToken;
    }
  }

  return null;
}

export async function revokeRefreshToken(tokenId: string) {
  await RefreshToken.destroy({ where: { id: tokenId } });
}

export async function revokeAllRefreshTokens(userId: string) {
  await RefreshToken.destroy({ where: { user_id: userId } });
}
