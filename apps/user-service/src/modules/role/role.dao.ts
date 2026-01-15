import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from '../../infrastructure/database/models/role.model';

@Injectable()
export class RoleDao {
  constructor(
    @InjectModel(Role)
    private readonly roleModel: typeof Role,
  ) {}

  create(data: { name: string; description?: string }) {
    return this.roleModel.create(data);
  }

  findAll() {
    return this.roleModel.findAll();
  }

  findById(id: string) {
    return this.roleModel.findByPk(id);
  }

  findByName(name: string) {
    return this.roleModel.findOne({ where: { name } });
  }

  delete(id: string) {
    return this.roleModel.destroy({ where: { id } });
  }
}
