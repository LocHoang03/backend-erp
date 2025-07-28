import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/mql/database.module';
import { TaskProviders } from './tasks.providers';
import { TaskService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...TaskProviders, TaskService],
  controllers: [TasksController],
})
export class TaskModule {}
