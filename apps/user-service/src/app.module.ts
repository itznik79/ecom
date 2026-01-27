import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';

@Module({
  imports: [
    DatabaseModule,
    RoleModule,
    PermissionModule,
  ],
})
export class AppModule {}
