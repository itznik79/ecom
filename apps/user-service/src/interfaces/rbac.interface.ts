export interface IUserRole {
  user_id: string;
  role_id: string;
  assigned_at: Date;
}

export interface IRolePermission {
  role_id: string;
  permission_id: string;
}