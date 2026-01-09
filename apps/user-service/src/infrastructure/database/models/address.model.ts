import {Table, Column, Model, DataType, PrimaryKey} from 'sequelize-typescript';
import { IUserAddress } from '../../../interfaces/user-address.interface';

@Table({
  tableName: 'user_addresses',
  timestamps: true,
  underscored: true,
})
export class UserAddress
  extends Model<UserAddress>
  implements IUserAddress
{
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @Column(DataType.UUID)
  user_id: string;

  @Column(DataType.STRING)
  type: 'home' | 'office' | 'billing';

  @Column(DataType.STRING)
  address_line1: string;

  @Column(DataType.STRING)
  address_line2?: string;

  @Column(DataType.STRING)
  city: string;

  @Column(DataType.STRING)
  state: string;

  @Column(DataType.STRING)
  country: string;

  @Column(DataType.STRING)
  postal_code: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_default: boolean;
}
