import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
