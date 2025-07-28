import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/mql/database.module';
import { ProjectProviders } from './projects.providers';
import { ProjectService } from './projects.service';
import { ProjectsController } from './projects.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...ProjectProviders, ProjectService],
  controllers: [ProjectsController],
})
export class ProjectModule {}
