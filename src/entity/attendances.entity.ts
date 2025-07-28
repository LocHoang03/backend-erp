import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  JoinColumn,
} from 'typeorm';
import { Employee } from './employee.entity';

export enum AttendanceStatus {
  ON_TIME = 'Đúng giờ',
  LATE = 'Đi trễ',
  ABSENT = 'Vắng mặt',
}

@Entity('attendances')
@Unique(['employee', 'work_date'])
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ type: 'date' })
  work_date: string;

  @Column({ type: 'time', nullable: true })
  check_in: string;

  @Column({ type: 'time', nullable: true })
  check_out: string;

  @Column({
    type: 'enum',
    enum: AttendanceStatus,
    default: AttendanceStatus.ON_TIME,
  })
  status: AttendanceStatus;

  @Column({ type: 'text', nullable: true })
  note: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
