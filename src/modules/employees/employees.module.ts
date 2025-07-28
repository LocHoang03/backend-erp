import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/mql/database.module';
import { employeeProviders } from './employees.providers';
import { EmployeeService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { CloudinaryModule } from 'src/configs/cloudinary/cloudinary.module';

@Module({
  imports: [DatabaseModule, CloudinaryModule],
  providers: [...employeeProviders, EmployeeService],
  controllers: [EmployeesController],
})
export class EmployeeModule {}
