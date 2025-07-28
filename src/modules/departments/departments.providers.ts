import { DataSource } from 'typeorm';
import { Department } from 'src/entity/department.entity';

export const departmentProviders = [
  {
    provide: 'DEPARTMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Department),
    inject: ['DB_ERP'],
  },
];
