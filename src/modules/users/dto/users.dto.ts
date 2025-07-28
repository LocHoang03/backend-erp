import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  mode: string;

  @IsOptional()
  @IsArray()
  role_id?: any[];

  @IsOptional()
  @IsString()
  password?: string;

  @IsNumber()
  assigned_employee_id: number;
}

export class LoginUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
