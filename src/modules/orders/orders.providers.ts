import { DataSource } from 'typeorm';
import { Order } from 'src/entity/orders.entity';

export const orderProviders = [
  {
    provide: 'ORDER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Order),
    inject: ['DB_ERP'],
  },
];
