import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserCredential } from "../models/user-credential-model";
import { AuthProviderType } from "../../../interfaces/enums/auth-provider.enum";

@Injectable()
export class UserCredentialDao {

  constructor(
    @InjectModel(UserCredential)
    private readonly model: typeof UserCredential
  ) {}

  async createCredential(data: {
    user_id: string;
    email: string;
    password_hash: string;
    provider:AuthProviderType;
  }) {
    return this.model.create(data);
  }

  async findByEmail(email: string) {
    return this.model.findOne({ where: { email } });
  }
  async findByUserId(user_id: string) {
    return this.model.findOne({ where: { user_id } });
  }
}
