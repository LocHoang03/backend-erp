import { Controller, Get } from '@nestjs/common';
import { Order } from 'src/entity/orders.entity';
import { OrderService } from './orders.service';

@Controller('Orders')
export class OrdersController {
  constructor(private readonly OrderService: OrderService) {}

  @Get()
  async findAll(): Promise<Order[]> {
    return this.OrderService.findAll();
  }
}
