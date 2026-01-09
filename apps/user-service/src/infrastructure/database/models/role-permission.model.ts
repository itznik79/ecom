import {Table, Column, Model, DataType} from 'sequelize-typescript';

@Table({
  tableName: 'role_permissions',
  timestamps: false,
  underscored: true,
})
export class RolePermission extends Model<RolePermission> {
  @Column({ type: DataType.UUID, primaryKey: true })
  role_id: string;

  @Column({ type: DataType.UUID, primaryKey: true })
  permission_id: string;
}
