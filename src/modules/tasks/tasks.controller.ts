import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Task } from 'src/entity/tasks.entity';
import { TaskService } from './tasks.service';
import { TaskDto } from './dto/tasks.dto';
import { plainToInstance } from 'class-transformer';
import * as dayjs from 'dayjs';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/common/decorators/permission.decorator';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @UseGuards(PermissionGuard)
  @Permission('tasks.create')
  @Post('/create')
  async create(@Req() req: Request): Promise<Task> {
    const body = { ...req.body } as any;

    const data = {
      ...body,
      start_date: dayjs(body.start_date).format('YYYY-MM-DD'),
      end_date: body.end_date
        ? dayjs(body.end_date).format('YYYY-MM-DD')
        : undefined,
    };

    const dtoInstance = plainToInstance(TaskDto, data);

    return this.taskService.create(dtoInstance);
  }

  @UseGuards(PermissionGuard)
  @Permission('tasks.edit')
  @Put('/update')
  async update(@Req() req: Request): Promise<Task> {
    const body = { ...req.body } as any;

    const data = {
      ...body,
      start_date: dayjs(body.start_date).format('YYYY-MM-DD'),
      end_date: body.end_date
        ? dayjs(body.end_date).format('YYYY-MM-DD')
        : undefined,
    };

    const dtoInstance = plainToInstance(TaskDto, data);

    return this.taskService.update(dtoInstance);
  }

  @UseGuards(PermissionGuard)
  @Permission('tasks.edit')
  @Put('/confirm')
  async confirm(@Body('id') id: number): Promise<Task> {
    return this.taskService.confirm(id);
  }
}
