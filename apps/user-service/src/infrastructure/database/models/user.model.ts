import { Table, Column, Model, DataType, PrimaryKey,Default } from 'sequelize-typescript';
import { IUser } from '../../../interfaces/user.interface';
import type { AuthProviderType } from '../../../interfaces/enums/auth-provider.enum';
import { Optional, Sequelize } from 'sequelize';

export interface UserAttributes {
  id: string;
  email: string;
  provider: AuthProviderType;
  provider_id?: string;
  is_active: boolean;
}
export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'is_active' | 'provider_id'> { }
@Table({
  tableName: 'users',
  timestamps: true,
  underscored: true,
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  provider: AuthProviderType;

  @Column(DataType.STRING)
  provider_id?: string;

    @Default(true)  
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;
}
