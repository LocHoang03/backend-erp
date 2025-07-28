import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Task, TaskStatus } from '../../entity/tasks.entity';
import { Not, Repository } from 'typeorm';
import { TaskDto } from './dto/tasks.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  async create(createTaskDto: TaskDto): Promise<Task> {
    const newTask = await this.taskRepository.save(
      this.taskRepository.create({
        ...createTaskDto,
        project: { id: createTaskDto.project_id },
        assigned_employee: { id: createTaskDto.assigned_employee_id },
      }),
    );
    const fullData = await this.taskRepository.findOne({
      where: { id: newTask.id },
      relations: ['project', 'assigned_employee'],
    });

    if (!fullData) {
      throw new NotFoundException('Không tìm thấy công việc vừa tạo.');
    }

    return fullData;
  }

  async update(updateDto: TaskDto): Promise<Task> {
    const Task = await this.taskRepository.findOne({
      where: { id: updateDto.id },
    });
    if (!Task) {
      throw new NotFoundException('Không tìm thấy công viếc!!');
    }

    const updateTask = await this.taskRepository.save({
      ...updateDto,
      project: { id: updateDto.project_id },
      assigned_employee: { id: updateDto.assigned_employee_id },
    });
    const fullData = await this.taskRepository.findOne({
      where: { id: updateTask.id },
      relations: ['project', 'assigned_employee'],
    });

    if (!fullData) {
      throw new NotFoundException('Không tìm thấy công việc vừa tạo.');
    }

    return fullData;
  }

  async confirm(id: number): Promise<Task> {
    if (!id) {
      throw new BadRequestException('Thiếu ID công việc!');
    }

    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['project', 'assigned_employee'],
    });

    if (!task) {
      throw new NotFoundException('Không tìm thấy công việc này!!');
    }
    const today = dayjs();
    const compareDate = dayjs(task.end_date);

    const isPast = today.isAfter(compareDate);
    task.status = isPast ? TaskStatus.OVERDUE : TaskStatus.DONE;
    return await this.taskRepository.save(task);
  }
}
