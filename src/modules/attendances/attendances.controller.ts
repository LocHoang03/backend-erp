import { Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Attendance } from 'src/entity/attendances.entity';
import { AttendanceService } from './attendances.service';
import { AttendanceDto } from './dto/attendances.dto';
import * as dayjs from 'dayjs';
import { plainToInstance } from 'class-transformer';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/common/decorators/permission.decorator';

@Controller('attendances')
export class AttendancesController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get()
  async findAll(): Promise<Attendance[]> {
    return this.attendanceService.findAll();
  }

  @UseGuards(PermissionGuard)
  @Permission('attendances.create')
  @Post('/create')
  async create(@Req() req: Request): Promise<Attendance> {
    const body = { ...req.body } as any;

    const data = {
      ...body,
      work_date: dayjs(body.work_date).format('YYYY-MM-DD'),
      check_in: body.check_in
        ? dayjs(body.check_in, 'HH:mm:ss').format('HH:mm:ss')
        : undefined,
      check_out: body.check_out
        ? dayjs(body.check_out, 'HH:mm:ss').format('HH:mm:ss')
        : undefined,
    };

    const dtoInstance = plainToInstance(AttendanceDto, data);
    return this.attendanceService.create(dtoInstance);
  }

  @UseGuards(PermissionGuard)
  @Permission('attendances.edit')
  @Put('/update')
  async update(@Req() req: Request): Promise<Attendance> {
    const body = { ...req.body } as any;

    const data = {
      ...body,
      work_date: dayjs(body.work_date).format('YYYY-MM-DD'),
      check_in: body.check_in
        ? dayjs(body.check_in, 'HH:mm:ss').format('HH:mm:ss')
        : undefined,
      check_out: body.check_out
        ? dayjs(body.check_out, 'HH:mm:ss').format('HH:mm:ss')
        : undefined,
    };
    const dtoInstance = plainToInstance(AttendanceDto, data);
    return this.attendanceService.update(dtoInstance);
  }
}
