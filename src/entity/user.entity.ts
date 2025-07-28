import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserRole } from './user-role.entity';
import { Employee } from './employee.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100 })
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  is_active: boolean;

  @OneToMany(() => UserRole, (rp) => rp.user, {
    cascade: true,
    eager: true,
  })
  userRole: UserRole[];

  @OneToOne(() => Employee, (el) => el.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ default: false })
  is_delete: boolean;

  @Column({ default: true })
  can_query: boolean;

  @CreateDateColumn()
  created_at: Date;

  @Column({
    type: 'enum',
    enum: ['admin', 'user'],
    default: 'user',
  })
  role: 'admin' | 'user';
}
