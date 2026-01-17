import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';

@Table({
  tableName: 'user_credentials',
  timestamps: true,
  underscored: true,
})
export class UserCredential extends Model<UserCredential> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
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
  provider: string;

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
