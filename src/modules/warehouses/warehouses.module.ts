import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/mql/database.module';
import { WarehouseProviders } from './warehouses.providers';
import { WarehouseService } from './warehouses.service';
import { WarehousesController } from './warehouses.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...WarehouseProviders, WarehouseService],
  controllers: [WarehousesController],
})
export class WarehouseModule {}
