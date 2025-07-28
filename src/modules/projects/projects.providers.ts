import { DataSource } from 'typeorm';
import { Project } from 'src/entity/projects.entity';
import { ProjectMember } from 'src/entity/project-member.entity';

export const ProjectProviders = [
  {
    provide: 'PROJECT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Project),
    inject: ['DB_ERP'],
  },
  {
    provide: 'PROJECT_MEMBER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProjectMember),
    inject: ['DB_ERP'],
  },
];
