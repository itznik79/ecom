export type AuthProvider = 'local' | 'google' | 'github';

export interface IUserCredential {
  user_id: string;
  email: string;
  password_hash?: string;
  provider: AuthProvider;
  provider_id?: string;
  is_active: boolean;
  last_login_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}
