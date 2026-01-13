import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() body: { name: string; description?: string }) {
    return this.roleService.createRole(body);
  }

  @Get()
  findAll() {
    return this.roleService.getAllRoles();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.getRoleById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.deleteRole(id);
  }
}
