import { DataSource } from 'typeorm';
import { Warehouse } from 'src/entity/warehouse.entity';

export const WarehouseProviders = [
  {
    provide: 'WAREHOUSE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Warehouse),
    inject: ['DB_ERP'],
  },
];
