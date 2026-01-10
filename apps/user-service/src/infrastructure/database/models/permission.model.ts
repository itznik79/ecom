import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';

interface PermissionAttributes {
  id: string;
  key: string;
  description?: string;
}

interface PermissionCreationAttributes
  extends Optional<PermissionAttributes, 'id'> {}

@Table({
  tableName: 'permissions',
  timestamps: false,
  underscored: true,
})
export class Permission extends Model<
  PermissionAttributes,
  PermissionCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare key: string;

  @Column(DataType.STRING)
  declare description?: string;
}
