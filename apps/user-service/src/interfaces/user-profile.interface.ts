export interface IUserProfile {
  id: string;
  user_id: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  avatar_url?: string;
  dob?: Date;
  created_at?: Date;
  updated_at?: Date;
}
