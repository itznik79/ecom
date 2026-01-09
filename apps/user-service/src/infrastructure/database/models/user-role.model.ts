import {Table, Column, Model, DataType, PrimaryKey} from 'sequelize-typescript';
import { IRole } from '../../../interfaces/role.interface';

@Table({
  tableName: 'roles',
  timestamps: false,
  underscored: true,
})
export class Role extends Model<Role> implements IRole {
  created_at?: Date;
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @Column(DataType.STRING)
  description?: string;
}
