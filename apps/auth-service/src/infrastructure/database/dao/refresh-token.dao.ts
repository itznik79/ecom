import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RefreshToken } from '../models/refresh-token-model';

@Injectable()
export class RefreshTokenDao {
  constructor(
    @InjectModel(RefreshToken)
    private readonly model: typeof RefreshToken,
  ) {}

  async create(data: {
    id: string;
    user_id: string;
    token_hash: string;
    expires_at: Date;
  }) {
    return this.model.create(data);
  }

  async findValidByUser(user_id: string) {
    return this.model.findOne({
      where: { user_id, revoked_at: null },
    });
  }

  async revoke(id: string) {
    return this.model.update(
      { revoked_at: new Date() },
      { where: { id } },
    );
  }
}
