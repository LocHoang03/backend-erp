import { TaskPriority, TaskStatus } from './../../../entity/tasks.entity';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class TaskDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  status?: TaskStatus;

  @IsEnum(TaskPriority, { message: 'Độ ưu tiên không hợp lệ' })
  priority: TaskPriority;

  @IsDateString({}, { message: 'Ngày bắt đầu không hợp lệ' })
  @IsOptional()
  start_date?: Date;

  @IsDateString({}, { message: 'Ngày kết thúc không hợp lệ' })
  @IsOptional()
  end_date?: Date;

  @IsNumber()
  @IsOptional()
  project_id?: number;

  @IsNumber()
  @IsOptional()
  assigned_employee_id?: number;
}
