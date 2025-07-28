import { Controller, Get } from '@nestjs/common';
import { Customer } from 'src/entity/customer.entity';
import { CustomerService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly CustomerService: CustomerService) {}

  @Get()
  async findAll(): Promise<Customer[]> {
    return this.CustomerService.findAll();
  }
}
