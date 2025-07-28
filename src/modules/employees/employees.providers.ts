import { DataSource } from 'typeorm';
import { Employee } from 'src/entity/employee.entity';

export const employeeProviders = [
  {
    provide: 'EMPLOYEE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Employee),
    inject: ['DB_ERP'],
  },
];
