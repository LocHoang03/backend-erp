import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/mql/database.module';
import { departmentProviders } from './departments.providers';
import { DepartmentService } from './departments.service';
import { DepartmentsController } from './departments.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...departmentProviders, DepartmentService],
  controllers: [DepartmentsController],
})
export class DepartmentModule {}
