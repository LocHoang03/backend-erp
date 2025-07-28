import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/mql/database.module';
import { SalaryProviders } from './salaries.providers';
import { SalaryService } from './salaries.service';
import { SalariesController } from './salaries.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...SalaryProviders, SalaryService],
  controllers: [SalariesController],
})
export class SalaryModule {}
