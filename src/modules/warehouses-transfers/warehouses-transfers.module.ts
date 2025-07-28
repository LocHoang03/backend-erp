import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/mql/database.module';
import { WarehouseTransferProviders } from './warehouses-transfers.providers';
import { WarehouseTransferService } from './warehouses-transfers.service';
import { WarehouseTransfersController } from './warehouses-transfers.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...WarehouseTransferProviders, WarehouseTransferService],
  controllers: [WarehouseTransfersController],
})
export class WarehouseTransferModule {}
