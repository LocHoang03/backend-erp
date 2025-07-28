import { Injectable, Inject } from '@nestjs/common';
import { Order } from '../../entity/orders.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private OrderRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.OrderRepository.find({
      order: {
        created_at: 'DESC',
      },
      relations: ['customer', 'items'],
    });
  }
}
