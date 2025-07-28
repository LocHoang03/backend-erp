import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class WarehouseDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;
}
