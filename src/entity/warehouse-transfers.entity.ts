import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Warehouse } from './warehouse.entity';
import { WarehouseTransferItem } from './warehouse-transfer-item.entity';
import { User } from './user.entity';
import { IsEnum } from 'class-validator';

export enum WarehouseTransferStatus {
  PENDING = 'Chưa xác nhận',
  COMPLETED = 'Hoàn tất',
  CANCELLED = 'Từ chối',
}

@Entity('warehouse_transfers')
export class WarehouseTransfer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Warehouse, { nullable: true, eager: true })
  @JoinColumn({ name: 'from_warehouse_id' })
  from_warehouse: Warehouse;

  @ManyToOne(() => Warehouse, { nullable: true, eager: true })
  @JoinColumn({ name: 'to_warehouse_id' })
  to_warehouse: Warehouse;

  @OneToMany(() => WarehouseTransferItem, (item) => item.transfer, {
    cascade: true,
  })
  items: WarehouseTransferItem[];

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'text', nullable: true })
  note: string;

  @IsEnum(WarehouseTransferStatus)
  @Column({
    type: 'enum',
    enum: WarehouseTransferStatus,
    default: WarehouseTransferStatus.PENDING,
  })
  status?: WarehouseTransferStatus;

  @Column({ default: false })
  is_deleted: boolean;
}
