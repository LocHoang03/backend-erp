import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { RolePermission } from './role-permission.entity';
import { UserRole } from './user-role.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: false })
  allow_delete: boolean;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => RolePermission, (rp) => rp.role, { eager: true })
  rolePermissions: RolePermission[];

  @OneToMany(() => UserRole, (rp) => rp.role)
  userRoles: UserRole[];
}
