import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PartnerType {
  CUSTOMER = 'Khách hàng',
  SUPPLIER = 'Nhà cung cấp',
}

@Entity('partners')
export class Partner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ length: 100, nullable: true })
  phone: string;

  @Column({ length: 500, nullable: true })
  address: string;

  @Column({ nullable: true })
  tax_code: string;

  @Column({ type: 'enum', enum: PartnerType })
  type: PartnerType;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
