import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/mql/database.module';
import { customerProviders } from './customers.providers';
import { CustomerService } from './customers.service';
import { CustomersController } from './customers.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...customerProviders, CustomerService],
  controllers: [CustomersController],
})
export class CustomerModule {}
