import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Permission } from '../../infrastructure/database/models/permission.model';

@Injectable()
export class PermissionDao {
  constructor(
    @InjectModel(Permission)
    private readonly permissionModel: typeof Permission,
  ) {}

  create(data: { key: string; description?: string }) {
    return this.permissionModel.create(data);
  }

  findAll() {
    return this.permissionModel.findAll();
  }

  findById(id: string) {
    return this.permissionModel.findByPk(id);
  }

  findByKey(key: string) {
    return this.permissionModel.findOne({ where: { key } });
  }

  delete(id: string) {
    return this.permissionModel.destroy({ where: { id } });
  }
}
