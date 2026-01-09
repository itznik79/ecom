import {Table, Column, Model, DataType, PrimaryKey} from 'sequelize-typescript';
import { IPermission } from '../../../interfaces/permission.interface';

@Table({
  tableName: 'permissions',
  timestamps: false,
  underscored: true,
})
export class Permission
  extends Model<Permission>
  implements IPermission
{
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  key: string;

  @Column(DataType.STRING)
  description?: string;
}
