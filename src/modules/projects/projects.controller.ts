import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Project } from 'src/entity/projects.entity';
import { ProjectService } from './projects.service';
import { ProjectDto } from './dto/projects.dto';
import { plainToInstance } from 'class-transformer';
import * as dayjs from 'dayjs';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/common/decorators/permission.decorator';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @UseGuards(PermissionGuard)
  @Permission('projects.create')
  @Post('/create')
  async create(@Req() req: Request): Promise<Project> {
    const body = { ...req.body } as any;
    const projectMember = body.project_member;

    delete body.project_member;

    const data = {
      ...body,
      start_date: dayjs(body.start_date).format('YYYY-MM-DD'),
      end_date: body.end_date
        ? dayjs(body.end_date).format('YYYY-MM-DD')
        : undefined,
    };

    const dtoInstance = plainToInstance(ProjectDto, data);

    return this.projectService.create(dtoInstance, projectMember);
  }

  @UseGuards(PermissionGuard)
  @Permission('projects.edit')
  @Put('/update')
  async update(@Req() req: Request): Promise<Project> {
    const body = { ...req.body } as any;
    const projectMember = body.project_member;

    delete body.project_member;

    const data = {
      ...body,
      start_date: dayjs(body.start_date).format('YYYY-MM-DD'),
      end_date: body.end_date
        ? dayjs(body.end_date).format('YYYY-MM-DD')
        : undefined,
    };

    const dtoInstance = plainToInstance(ProjectDto, data);

    return this.projectService.update(dtoInstance, projectMember);
  }

  @UseGuards(PermissionGuard)
  @Permission('projects.edit')
  @Put('/remove')
  async remove(@Body('id') id: number): Promise<Project> {
    return this.projectService.remove(id);
  }
}
