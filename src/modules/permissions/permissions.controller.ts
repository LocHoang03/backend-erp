import { Controller, Get } from '@nestjs/common';
import { Permission } from 'src/entity/permission.entity';
import { PermissionService } from './permissions.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  async findAll(): Promise<Permission[]> {
    return this.permissionService.findAll();
  }
}
