import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Department } from './../../entity/department.entity';
import { Not, Repository } from 'typeorm';
import {
  CreateDepartmentDto,
  UpdateDepartmentDto,
} from './dto/departments.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject('DEPARTMENT_REPOSITORY')
    private departmentRepository: Repository<Department>,
  ) {}

  async findAll(): Promise<Department[]> {
    return this.departmentRepository.find({
      where: {
        is_deleted: false,
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const exists = await this.departmentRepository.findOne({
      where: [
        { name: createDepartmentDto.name },
        { code: createDepartmentDto.code },
      ],
    });

    if (exists) {
      throw new BadRequestException('Tên hoặc mã(code) phòng ban đã tồn tại');
    }

    const newDepartment = await this.departmentRepository.save(
      this.departmentRepository.create(createDepartmentDto),
    );

    return newDepartment;
  }

  async update(updateDto: UpdateDepartmentDto): Promise<Department> {
    const { id, name, description, code } = updateDto;
    const existing = await this.departmentRepository.findOne({
      where: [
        { name: name, id: Not(id) },
        { code: code, id: Not(id) },
      ],
    });
    if (existing) {
      throw new BadRequestException('Tên hoặc mã(code) đã tồn tại!!');
    }
    const Department = await this.departmentRepository.findOne({
      where: { id },
    });
    if (!Department) {
      throw new NotFoundException('Không tìm thấy phòng ban!!');
    }
    return this.departmentRepository.save(Object.assign(Department, updateDto));
  }

  async delete(id: number): Promise<Department> {
    if (!id) {
      throw new BadRequestException('Thiếu ID phòng ban!');
    }
    const Department = await this.departmentRepository.findOne({
      where: { id: id },
    });
    if (!Department) {
      throw new NotFoundException('Không tìm thấy phòng ban');
    }
    Department['is_deleted'] = true;
    return await this.departmentRepository.save(Department);
  }
}
