import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Salary } from 'src/entity/salary.entity';
import { SalaryService } from './salaries.service';
import { SalaryDto } from './dto/salaries.dto';
import * as dayjs from 'dayjs';
import { plainToInstance } from 'class-transformer';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/common/decorators/permission.decorator';

@Controller('salaries')
export class SalariesController {
  constructor(private readonly salaryService: SalaryService) {}

  @Get()
  async findAll(): Promise<Salary[]> {
    return this.salaryService.findAll();
  }

  @UseGuards(PermissionGuard)
  @Permission('salary.create')
  @Post('/create')
  async create(@Req() req: Request): Promise<Salary> {
    const body = { ...req.body } as any;

    const data = {
      ...body,
      salary_month: dayjs(body.salary_month).format('YYYY-MM'),
    };
    const dtoInstance = plainToInstance(SalaryDto, data);

    return this.salaryService.create(dtoInstance);
  }

  @UseGuards(PermissionGuard)
  @Permission('salary.edit')
  @Put('/update')
  async update(@Req() req: Request): Promise<Salary> {
    const body = { ...req.body } as any;

    const data = {
      ...body,
      salary_month: dayjs(body.salary_month).format('YYYY-MM'),
    };
    const dtoInstance = plainToInstance(SalaryDto, data);

    return this.salaryService.update(dtoInstance);
  }

  @UseGuards(PermissionGuard)
  @Permission('salary.edit')
  @Put('/confirm')
  async confirm(@Body('id') id: number): Promise<Salary> {
    return this.salaryService.confirm(id);
  }
}
