import { Injectable, Inject } from '@nestjs/common';
import { Customer } from '../../entity/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private CustomerRepository: Repository<Customer>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return this.CustomerRepository.find({
      where: {
        is_deleted: false,
      },
      order: {
        created_at: 'DESC',
      },
      relations: ['orders'],
    });
  }
}
