import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Project } from './projects.entity';
import { Employee } from './employee.entity';

export enum TaskStatus {
  OVERDUE = 'Quá hạn',
  DOING = 'Đang làm',
  DONE = 'Đã hoàn thành',
}

export enum TaskPriority {
  LOW = 'Thấp',
  MEDIUM = 'Trung bình',
  HIGH = 'Cao',
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.DOING })
  status: TaskStatus;

  @Column({ type: 'enum', enum: TaskPriority })
  priority: TaskPriority;

  @Column({ type: 'date', nullable: true })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date;

  // @Column({ nullable: true })
  // project_id: number;

  // @Column({ nullable: true })
  // assigned_employee_id: number;

  @ManyToOne(() => Project, (project) => project.tasks, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'project_id' })
  project?: Project;

  @ManyToOne(() => Employee, { onDelete: 'SET NULL', eager: true })
  @JoinColumn({ name: 'assigned_employee_id' })
  assigned_employee?: Employee;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
