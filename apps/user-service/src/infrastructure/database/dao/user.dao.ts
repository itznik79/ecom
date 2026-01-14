import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { AuthProviderType } from "../../../interfaces/enums/auth-provider.enum";

@Injectable()
export class UserDao {
    constructor(
        @InjectModel(User)
        private readonly model: typeof User,
    ) { }

    createUser(data: { id: string; email: string; provider: AuthProviderType }) {
        return this.model.create(data);
    }

    findById(id: string) {
        return this.model.findOne({ where: { id } });
    }

    findByEmail(email: string) {
        return this.model.findOne({ where: { email } });
    }
}
