import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/mql/database.module';
import { permissionProviders } from './permissions.providers';
import { PermissionService } from './permissions.service';
import { PermissionsController } from './permissions.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...permissionProviders, PermissionService],
  controllers: [PermissionsController],
})
export class PermissionModule {}
