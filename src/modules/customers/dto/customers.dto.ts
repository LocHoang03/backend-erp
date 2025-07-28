import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
