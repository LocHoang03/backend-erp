import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProjectMember } from './project-member.entity';
import { Task } from './tasks.entity';
import { Employee } from './employee.entity';

export enum ProjectStatus {
  ACTIVE = 'Đang triển khai',
  DONE = 'Đã hoàn thành',
  OVERDUE = 'Trễ hạn',
  REMOVE = 'Loại bỏ',
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Employee, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'owner_id' })
  employee: Employee;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date;

  @Column({ type: 'enum', enum: ProjectStatus, default: ProjectStatus.ACTIVE })
  status: ProjectStatus;

  @OneToMany(() => ProjectMember, (member) => member.project, {
    eager: true,
  })
  members?: ProjectMember[];

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
