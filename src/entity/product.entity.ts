import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { WarehouseProduct } from './warehouse-product.entity';
import { Category } from './category.entity';

export enum ProductStatus {
  ACTIVE = 'Hoạt động',
  INACTIVE = 'Không hoạt động',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('decimal', { precision: 15, scale: 2 })
  unit_price: number;

  @Column('decimal', {
    precision: 15,
    scale: 2,
  })
  original_price: number;

  @Column({ length: 50, nullable: true })
  unit: string;

  @Column({
    nullable: true,
    default:
      'https://res.cloudinary.com/dzxupp48t/image/upload/v1751188121/image-product-ERP/lomgyunhneuzrlj8to5c.webp',
  })
  avatar_url: string;

  @Column({ nullable: true })
  avatar_id: string;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.ACTIVE,
  })
  status: ProductStatus;

  @Column({ nullable: true })
  category_id: number;

  @OneToMany(() => WarehouseProduct, (wp) => wp.product)
  warehouse_products: WarehouseProduct[];

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ default: false })
  is_deleted: boolean;
}
