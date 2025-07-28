import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class SalaryDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsNumber()
  employee_id: number;

  @IsNotEmpty()
  @IsString()
  salary_month: string;

  @IsNumber()
  @IsPositive()
  base_salary: number;

  @IsNumber()
  @IsOptional()
  bonus?: number;

  @IsNumber()
  @IsOptional()
  allowance?: number;

  @IsNumber()
  @IsOptional()
  deduction?: number;

  @IsOptional()
  @IsString()
  note?: string;
}
