import { AuthProviderType } from './enums/auth-provider.enum';

export interface IRegisterPayload {
  email: string;
  password?: string; // optional for OAuth
  provider: AuthProviderType;
  provider_id?: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IAuthResult {
  accessToken: string;
  refreshToken: string;
}
