import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/mql/database.module';
import { attendanceProviders } from './attendances.providers';
import { AttendanceService } from './attendances.service';
import { AttendancesController } from './attendances.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...attendanceProviders, AttendanceService],
  controllers: [AttendancesController],
})
export class AttendanceModule {}
