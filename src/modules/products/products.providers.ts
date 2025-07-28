import { DataSource } from 'typeorm';
import { Product } from 'src/entity/product.entity';
import { WarehouseProduct } from 'src/entity/warehouse-product.entity';

export const ProductProviders = [
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
    inject: ['DB_ERP'],
  },
  {
    provide: 'WAREHOUSE_PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(WarehouseProduct),
    inject: ['DB_ERP'],
  },
];
