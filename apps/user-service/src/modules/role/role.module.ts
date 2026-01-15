import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from '../../infrastructure/database/models/role.model';
import { RoleDao } from './role.dao';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';

@Module({
  imports: [SequelizeModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleDao, RoleService],
  exports: [RoleService],
})
export class RoleModule {}
