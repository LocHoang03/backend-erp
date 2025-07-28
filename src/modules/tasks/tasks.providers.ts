import { DataSource } from 'typeorm';
import { Task } from 'src/entity/tasks.entity';

export const TaskProviders = [
  {
    provide: 'TASK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
    inject: ['DB_ERP'],
  },
];
