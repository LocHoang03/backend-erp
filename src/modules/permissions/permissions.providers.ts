import { DataSource } from 'typeorm';
import { Permission } from './../../entity/permission.entity';

export const permissionProviders = [
  {
    provide: 'PERMISSION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Permission),
    inject: ['DB_ERP'],
  },
];
