import { Type } from 'class-transformer';
import { WarehouseTransferStatus } from './../../../entity/warehouse-transfers.entity';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class WarehouseTransferDto {
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsEnum(WarehouseTransferStatus, {
    message: 'Loại trạng thái phiếu không hợp lệ!',
  })
  status: WarehouseTransferStatus;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  from_warehouse_id: number;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  to_warehouse_id: number;

  @IsOptional()
  @IsNumber()
  created_by?: number;

  @IsOptional()
  @IsString()
  note?: string;
}

export class WarehouseTransferItemDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
