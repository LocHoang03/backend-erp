import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { Department } from 'src/entity/department.entity';
import { DepartmentService } from './departments.service';
import {
  CreateDepartmentDto,
  UpdateDepartmentDto,
} from './dto/departments.dto';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/common/decorators/permission.decorator';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  async findAll(): Promise<Department[]> {
    return this.departmentService.findAll();
  }

  @UseGuards(PermissionGuard)
  @Permission('departments.create')
  @Post('/create')
  async create(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    return this.departmentService.create(createDepartmentDto);
  }

  @UseGuards(PermissionGuard)
  @Permission('departments.edit')
  @Put('/update')
  async update(
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department> {
    return this.departmentService.update(updateDepartmentDto);
  }

  @UseGuards(PermissionGuard)
  @Permission('departments.delete')
  @Put('/delete')
  async delete(@Body('id') id: number): Promise<Department> {
    return this.departmentService.delete(id);
  }
}
