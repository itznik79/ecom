import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { IRole } from '../../../interfaces/role.interface';

interface RoleAttributes {
  id: string;
  name: string;
  description?: string;
  created_at?: Date;
}

interface RoleCreationAttributes
  extends Optional<RoleAttributes, 'id' | 'description' | 'created_at'> {}

@Table({
  tableName: 'roles',
  timestamps: false,
  underscored: true,
})
export class Role
  extends Model<RoleAttributes, RoleCreationAttributes>
  implements IRole
{
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare name: string;

  @Column(DataType.STRING)
  declare description?: string;

  declare created_at?: Date;
}
