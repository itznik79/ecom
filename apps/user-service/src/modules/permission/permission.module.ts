import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permission } from '../../infrastructure/database/models/permission.model';
import { PermissionDao } from './permission.dao';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';

@Module({
  imports: [SequelizeModule.forFeature([Permission])],
  controllers: [PermissionController],
  providers: [PermissionDao, PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
