import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Employee } from './employee.entity';

export enum SalaryStatus {
  PAID = 'Đã trả lương',
  UNPAID = 'Chưa trả lương',
}

@Entity('salaries')
export class Salary {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column()
  salary_month: string;

  @Column('decimal', { precision: 15, scale: 2 })
  base_salary: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  bonus: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  allowance: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  deduction: number;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    generatedType: 'STORED',
    asExpression: 'base_salary + bonus + allowance - deduction',
  })
  net_salary: number;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({
    type: 'enum',
    enum: SalaryStatus,
    default: SalaryStatus.UNPAID,
  })
  status: SalaryStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
