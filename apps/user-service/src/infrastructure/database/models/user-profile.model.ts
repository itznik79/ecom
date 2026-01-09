import {Table, Column, Model, DataType, PrimaryKey} from 'sequelize-typescript';
import { IUserProfile } from '../../../interfaces/user-profile.interface';

@Table({
  tableName: 'user_profiles',
  timestamps: true,
  underscored: true,
})
export class UserProfile
  extends Model<UserProfile>
  implements IUserProfile
{
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    unique: true,
  })
  user_id: string;

  @Column(DataType.STRING)
  first_name?: string;

  @Column(DataType.STRING)
  last_name?: string;

  @Column(DataType.STRING)
  phone?: string;

  @Column(DataType.STRING)
  avatar_url?: string;

  @Column(DataType.DATEONLY)
  dob?: Date;
}
