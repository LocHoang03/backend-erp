// dto/create-product.dto.ts
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
} from 'class-validator';

export enum ProductStatus {
  ACTIVE = 'Hoạt động',
  INACTIVE = 'Không hoạt động',
}

export class ProductDto {
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber({}, { message: 'Giá sản phẩm không hợp lệ!!' })
  unit_price: number;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber({}, { message: 'Giá sản phẩm không hợp lệ!!' })
  original_price: number;

  @IsNotEmpty()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsString()
  avatar_url?: string;

  @IsOptional()
  @IsString()
  avatar_id?: string;

  @IsNotEmpty()
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @Type(() => Number)
  @IsOptional()
  category_id?: number;
}
