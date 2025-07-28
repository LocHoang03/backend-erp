import { IsEnum, IsOptional, IsString, IsNumber, Min } from 'class-validator';

class TransactionItemDto {
  @IsNumber()
  product_id: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsOptional()
  @IsNumber()
  unit_price?: number;

  @IsOptional()
  @IsNumber()
  total_price?: number;
}

export class WarehouseTransactionDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsEnum(['Nhập kho', 'Xuất kho'])
  type: 'Nhập kho' | 'Xuất kho';

  @IsNumber()
  partner_id: number;

  @IsNumber()
  warehouse_id: number;

  @IsOptional()
  @IsString()
  note?: string;

  @IsNumber()
  @IsOptional()
  user_id: number;
}
