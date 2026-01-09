export interface IRole {
  id: string;
  name: string; // ADMIN | SELLER | USER
  description?: string;
  created_at?: Date;
}
