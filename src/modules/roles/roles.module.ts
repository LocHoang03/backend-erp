import { RoleService } from './roles.service';
import { roleProviders } from './roles.providers';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/mql/database.module';
import { RolesController } from './roles.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...roleProviders, RoleService],
  controllers: [RolesController],
})
export class RoleModule {}
