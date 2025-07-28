import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Project } from './projects.entity';
import { Employee } from './employee.entity';

@Entity('project_members')
export class ProjectMember {
  @PrimaryColumn()
  project_id: number;

  @PrimaryColumn()
  employee_id: number;

  @Column({ length: 100 })
  role_in_project: string;

  @ManyToOne(() => Project, (project) => project.members, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => Employee, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
