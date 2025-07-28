import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { Customer } from './customer.entity';

export enum OrderStatus {
  PENDING = 'Chờ thanh toán',
  PAID = 'Đã thanh toán',
  CANCELED = 'Đã hủy',
}

export enum PaymentType {
  UNKNOWN = 'Chưa xác định',
  COD = 'Tiền mặt',
  BANKING = 'Chuyển khoản ngân hàng',
  E_WALLET = 'Ví điện tử',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.orders, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @CreateDateColumn()
  created_at: Date;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  total_amount: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({
    type: 'enum',
    enum: PaymentType,
    default: PaymentType.UNKNOWN,
  })
  payment_method: PaymentType;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];
}
