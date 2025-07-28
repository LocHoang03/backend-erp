import { PartnerType } from './../../../entity/partners.entity';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class PartnerDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  tax_code?: string;

  @IsOptional()
  @IsEnum(PartnerType, { message: 'Loại đối tác không hợp lệ' })
  type?: PartnerType;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
