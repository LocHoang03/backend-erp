import { DataSource } from 'typeorm';
import { WarehouseTransfer } from 'src/entity/warehouse-transfers.entity';
import { WarehouseProduct } from 'src/entity/warehouse-product.entity';
import { WarehouseTransferItem } from 'src/entity/warehouse-transfer-item.entity';

export const WarehouseTransferProviders = [
  {
    provide: 'WAREHOUSE_TRANSFER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(WarehouseTransfer),
    inject: ['DB_ERP'],
  },
  {
    provide: 'WAREHOUSE_PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(WarehouseProduct),
    inject: ['DB_ERP'],
  },
  {
    provide: 'WAREHOUSE_TRANSFER_ITEM_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(WarehouseTransferItem),
    inject: ['DB_ERP'],
  },
];
