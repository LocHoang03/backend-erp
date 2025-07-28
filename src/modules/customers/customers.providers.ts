import { DataSource } from 'typeorm';
import { Customer } from 'src/entity/customer.entity';

export const customerProviders = [
  {
    provide: 'CUSTOMER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Customer),
    inject: ['DB_ERP'],
  },
];
