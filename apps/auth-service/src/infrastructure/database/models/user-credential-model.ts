import { Table, Column, Model, DataType, PrimaryKey,Default } from 'sequelize-typescript';
import { IUserCredential } from '../../../interfaces/user-credential.interface';
import { AuthProviderType } from '../../../interfaces/enums/auth-provider.enum';

@Table({
  tableName: 'user_credentials',
  timestamps: true,
  underscored: true,
})
export class UserCredential
  extends Model<UserCredential>
  implements IUserCredential {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column(DataType.STRING)
  password_hash?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  provider: AuthProviderType;

  @Column(DataType.STRING)
  provider_id?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;

  @Column(DataType.DATE)
  last_login_at?: Date;
}
