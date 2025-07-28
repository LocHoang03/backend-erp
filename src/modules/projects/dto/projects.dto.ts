import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsArray,
  IsInt,
  IsNumber,
} from 'class-validator';

export enum ProjectStatus {
  ACTIVE = 'Đang triển khai',
  DONE = 'Đã hoàn thành',
  OVERDUE = 'Trễ hạn',
}

export class ProjectDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  owner_id: number;

  @IsDateString()
  start_date: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  member_ids?: number[];
}
