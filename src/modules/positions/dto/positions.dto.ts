import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreatePositionDto {
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

export class UpdatePositionDto extends PartialType(CreatePositionDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
