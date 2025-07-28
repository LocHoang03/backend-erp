import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/mql/database.module';
import { orderProviders } from './orders.providers';
import { OrderService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...orderProviders, OrderService],
  controllers: [OrdersController],
})
export class OrderModule {}
