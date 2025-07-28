import { DataSource } from 'typeorm';
import { Salary } from 'src/entity/salary.entity';

export const SalaryProviders = [
  {
    provide: 'SALARY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Salary),
    inject: ['DB_ERP'],
  },
];
