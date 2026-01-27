import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { PermissionService } from './permission.service';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  create(@Body() body: { key: string; description?: string }) {
    return this.permissionService.createPermission(body);
  }

  @Get()
  findAll() {
    return this.permissionService.getAllPermissions();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionService.getPermissionById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionService.deletePermission(id);
  }
}
