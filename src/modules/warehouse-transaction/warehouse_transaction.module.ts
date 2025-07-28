import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/mql/database.module';
import { WarehouseTransactionProviders } from './warehouse_transaction.providers';
import { WarehouseTransactionService } from './warehouse_transaction.service';
import { WarehouseTransactionsController } from './warehouse_transaction.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...WarehouseTransactionProviders, WarehouseTransactionService],
  controllers: [WarehouseTransactionsController],
})
export class WarehouseTransactionModule {}
