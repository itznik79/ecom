import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'user_credentials',
})
export default class UserCredential extends Model<UserCredential> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;
}
