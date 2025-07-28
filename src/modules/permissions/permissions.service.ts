import { Injectable, Inject } from '@nestjs/common';
import { Permission } from './../../entity/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @Inject('PERMISSION_REPOSITORY')
    private permissionRepository: Repository<Permission>,
  ) {}

  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }
}
