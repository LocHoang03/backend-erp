import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { WarehouseTransaction } from './warehouse_transactions.entity';
import { Product } from './product.entity';

@Entity('warehouse_transaction_items')
export class WarehouseTransactionItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transaction_id: number;

  @ManyToOne(() => WarehouseTransaction, (tx) => tx.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'transaction_id' })
  transaction: WarehouseTransaction;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  unit_price: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  total_price: number;
}
