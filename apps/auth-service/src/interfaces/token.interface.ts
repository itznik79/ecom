export interface IRefreshToken {
  id: string;
  user_id: string;
  token_hash: string;
  expires_at: Date;
  revoked_at?: Date;
  created_at?: Date;
}
