import {Table, Column, Model, DataType, PrimaryKey} from 'sequelize-typescript';
import { IRefreshToken } from '../../../interfaces/token.interface';

@Table({
  tableName: 'refresh_tokens',
  timestamps: true,
  underscored: true,
  updatedAt: false,
})
export class RefreshToken
  extends Model<RefreshToken>
  implements IRefreshToken
{
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  token_hash: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expires_at: Date;

  @Column(DataType.DATE)
  revoked_at?: Date;
}
