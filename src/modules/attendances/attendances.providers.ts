import { DataSource } from 'typeorm';
import { Attendance } from 'src/entity/attendances.entity';

export const attendanceProviders = [
  {
    provide: 'ATTENDANCES_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Attendance),
    inject: ['DB_ERP'],
  },
];
