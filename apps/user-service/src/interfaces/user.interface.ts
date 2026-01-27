import { AuthProviderType } from './enums/auth-provider.enum';

export interface IUser {
  id: string;
  email: string;
  provider: AuthProviderType;
  provider_id?: string;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

