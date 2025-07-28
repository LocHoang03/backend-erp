import { DataSource } from 'typeorm';
import { Role } from './../../entity/role.entity';
import { RolePermission } from 'src/entity/role-permission.entity';
import { Permission } from 'src/entity/permission.entity';

export const roleProviders = [
  {
    provide: 'ROLE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Role),
    inject: ['DB_ERP'],
  },
  {
    provide: 'PERMISSION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Permission),
    inject: ['DB_ERP'],
  },
  {
    provide: 'PERMISSION_ROLE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RolePermission),
    inject: ['DB_ERP'],
  },
];
