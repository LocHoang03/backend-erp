import {
  IsEnum,
  IsOptional,
  IsString,
  IsDateString,
  IsMilitaryTime,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum AttendanceStatus {
  ON_TIME = 'Đúng giờ',
  LATE = 'Đi trễ',
  ABSENT = 'Vắng mặt',
}

export class AttendanceDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsDateString()
  work_date: string;

  @IsOptional()
  @IsMilitaryTime()
  check_in?: string;

  @IsOptional()
  @IsMilitaryTime()
  check_out?: string;

  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;

  @IsOptional()
  @IsString()
  note?: string;

  @Type(() => Number)
  employee_id: number;
}
