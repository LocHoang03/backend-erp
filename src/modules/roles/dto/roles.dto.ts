import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class RoleDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  permission_id: number[];
}
