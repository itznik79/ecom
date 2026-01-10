import { Injectable, BadRequestException } from '@nestjs/common';
import { RoleDao } from './role.dao';

@Injectable()
export class RoleService {
  constructor(private readonly roleDao: RoleDao) {}

  async createRole(data: { name: string; description?: string }) {
    const exists = await this.roleDao.findByName(data.name);
    if (exists) {
      throw new BadRequestException('Role already exists');
    }
    return this.roleDao.create(data);
  }

  getAllRoles() {
    return this.roleDao.findAll();
  }

  getRoleById(id: string) {
    return this.roleDao.findById(id);
  }

  deleteRole(id: string) {
    return this.roleDao.delete(id);
  }
}
