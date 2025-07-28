import { DataSource } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { UserRole } from 'src/entity/user-role.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DB_ERP'],
  },
  {
    provide: 'USER_ROLE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserRole),
    inject: ['DB_ERP'],
  },
];
