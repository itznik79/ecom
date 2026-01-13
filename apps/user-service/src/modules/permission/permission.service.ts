import { Injectable, BadRequestException } from '@nestjs/common';
import { PermissionDao } from './permission.dao';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionDao: PermissionDao) {}

  async createPermission(data: { key: string; description?: string }) {
    const exists = await this.permissionDao.findByKey(data.key);
    if (exists) {
      throw new BadRequestException('Permission already exists');
    }
    return this.permissionDao.create(data);
  }

  getAllPermissions() {
    return this.permissionDao.findAll();
  }

  getPermissionById(id: string) {
    return this.permissionDao.findById(id);
  }

  deletePermission(id: string) {
    return this.permissionDao.delete(id);
  }
}
