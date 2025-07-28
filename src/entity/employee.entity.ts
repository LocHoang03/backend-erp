import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Department } from './department.entity';
import { Position } from './position.entity';
import { User } from './user.entity';

export enum EmployeeStatus {
  PROBATION = 'Thử việc',
  WORKING = 'Đang làm',
  LEAVE = 'Nghỉ phép',
  TEMPORARY_STOP = 'Tạm nghỉ',
  QUIT = 'Đã nghỉ',
}

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  full_name: string;

  @Column({ type: 'enum', enum: ['Nam', 'Nữ'], default: 'Nam' })
  gender: 'Nam' | 'Nữ';

  @Column({ type: 'date', nullable: true })
  birth_date: Date;

  @Column({ length: 255, nullable: true })
  address: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  email: string;

  @Column({
    nullable: true,
    default:
      'https://res.cloudinary.com/dzxupp48t/image/upload/v1750331385/image-ERP/trssjrrwj5hmk7hibu1v.webp',
  })
  avatar_url: string;

  @Column({ nullable: true })
  avatar_id: string;

  @Column({
    type: 'enum',
    enum: EmployeeStatus,
    default: EmployeeStatus.PROBATION,
  })
  status: EmployeeStatus;

  @Column({ length: 20, unique: true })
  national_id: string;

  @Column({ nullable: true })
  department_id: number;

  @Column({ nullable: true })
  position_id?: number;

  @ManyToOne(() => Department, { eager: true })
  @JoinColumn({ name: 'department_id' })
  department?: Department;

  @ManyToOne(() => Position, { eager: true })
  @JoinColumn({ name: 'position_id' })
  position?: Position;

  @OneToOne(() => User, (us) => us.employee)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ default: false })
  is_deleted: boolean;
}
