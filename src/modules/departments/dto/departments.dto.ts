import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateDepartmentDto {
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

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
