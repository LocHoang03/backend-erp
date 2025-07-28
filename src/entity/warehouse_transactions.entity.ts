import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Partner } from './partners.entity';
import { Warehouse } from './warehouse.entity';
import { WarehouseTransactionItem } from './warehouse_transaction_items.entity';
import { User } from './user.entity';

export enum WarehouseTransactionStatus {
  PENDING = 'Chưa xử lý',
  COMPLETED = 'Đã xử lý',
  CANCELLED = 'Từ chối',
}

@Entity('warehouse_transactions')
export class WarehouseTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['Nhập kho', 'Xuất kho'] })
  type: 'Nhập kho' | 'Xuất kho';

  @ManyToOne(() => Partner, { eager: true })
  @JoinColumn({ name: 'partner_id' })
  partner: Partner;

  @ManyToOne(() => Warehouse, { eager: true })
  @JoinColumn({ name: 'warehouse_id' })
  warehouse: Warehouse;

  @OneToMany(() => WarehouseTransactionItem, (item) => item.transaction, {
    cascade: true,
    eager: true,
  })
  items: WarehouseTransactionItem[];

  @Column({
    type: 'enum',
    enum: WarehouseTransactionStatus,
    default: WarehouseTransactionStatus.PENDING,
  })
  status: WarehouseTransactionStatus;

  @Column({ type: 'text', nullable: true })
  note: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  created_by: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
