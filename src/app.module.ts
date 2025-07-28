import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from './modules/roles/roles.module';
import { PermissionModule } from './modules/permissions/permissions.module';
import { UserModule } from './modules/users/users.module';
import { MailModule } from './utils/mail/mail.module';
import { EmployeeModule } from './modules/employees/employees.module';
import { DepartmentModule } from './modules/departments/departments.module';
import { PositionModule } from './modules/positions/positions.module';
import { ConfigModule } from '@nestjs/config';
import { WarehouseModule } from './modules/warehouses/warehouses.module';
import { CategoryModule } from './modules/categories/categories.module';
import { ProductModule } from './modules/products/products.module';
import { WarehouseTransferModule } from './modules/warehouses-transfers/warehouses-transfers.module';
import { AttendanceModule } from './modules/attendances/attendances.module';
import { SalaryModule } from './modules/salaries/salaries.module';
import { ProjectModule } from './modules/projects/projects.module';
import { TaskModule } from './modules/tasks/tasks.module';
import { PartnerModule } from './modules/partners/partners.module';
import { WarehouseTransactionModule } from './modules/warehouse-transaction/warehouse_transaction.module';
import { OrderModule } from './modules/orders/orders.module';
import { CustomerModule } from './modules/customers/customers.module';
import { DatabaseModule } from './mql/database.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    RoleModule,
    PermissionModule,
    UserModule,
    MailModule,
    EmployeeModule,
    DepartmentModule,
    PositionModule,
    WarehouseModule,
    CategoryModule,
    ProductModule,
    WarehouseTransferModule,
    AttendanceModule,
    SalaryModule,
    ProjectModule,
    TaskModule,
    PartnerModule,
    WarehouseTransactionModule,
    OrderModule,
    CustomerModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
