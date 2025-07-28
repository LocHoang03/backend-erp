import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity('user_roles')
export class UserRole {
  @PrimaryColumn()
  role_id: number;

  @PrimaryColumn()
  user_id: number;

  @ManyToOne(() => Role, (role) => role.userRoles, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'role_id' })
  role?: Role;

  @ManyToOne(() => User, (user) => user.userRole, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user?: User;
}
