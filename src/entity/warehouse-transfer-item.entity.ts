import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { WarehouseTransfer } from './warehouse-transfers.entity';

@Entity('warehouse_transfer_items')
export class WarehouseTransferItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WarehouseTransfer, (transfer) => transfer.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'transfer_id' })
  transfer: WarehouseTransfer;

  @ManyToOne(() => Product, { nullable: false, eager: true })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  quantity: number;
}
