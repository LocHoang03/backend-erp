import { DataSource } from 'typeorm';
import { WarehouseTransaction } from 'src/entity/warehouse_transactions.entity';
import { WarehouseProduct } from 'src/entity/warehouse-product.entity';
import { WarehouseTransactionItem } from 'src/entity/warehouse_transaction_items.entity';
import { Product } from 'src/entity/product.entity';

export const WarehouseTransactionProviders = [
  {
    provide: 'WAREHOUSE_TRANSACTION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(WarehouseTransaction),
    inject: ['DB_ERP'],
  },
  {
    provide: 'WAREHOUSE_PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(WarehouseProduct),
    inject: ['DB_ERP'],
  },
  {
    provide: 'WAREHOUSE_TRANSACTION_ITEM_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(WarehouseTransactionItem),
    inject: ['DB_ERP'],
  },
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
    inject: ['DB_ERP'],
  },
];
