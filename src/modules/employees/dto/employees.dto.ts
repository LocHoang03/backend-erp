import { Type } from 'class-transformer';
import { EmployeeStatus } from './../../../entity/employee.entity';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsEnum,
  IsDateString,
  IsUrl,
  IsNumber,
  Length,
  Matches,
} from 'class-validator';

export enum Gender {
  Nam = 'Nam',
  Nu = 'Nữ',
}

export class CreateEmployeeDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @Length(1, 100)
  full_name: string;

  @IsEnum(Gender)
  gender: 'Nam' | 'Nữ';

  @IsOptional()
  @IsDateString()
  birth_date?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  @Matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, {
    message: 'Số điện thoại không hợp lệ!',
  })
  phone_number?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsUrl()
  avatar_url?: string;

  @IsOptional()
  @IsString()
  avatar_id?: string;

  @IsOptional()
  @IsEnum(EmployeeStatus)
  status?: EmployeeStatus;

  @IsString()
  @Matches(/^\d{12}$/, {
    message: 'Số CMND/CCCD phải đúng 12 chữ số!',
  })
  national_id: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  department_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  position_id?: number;
}
