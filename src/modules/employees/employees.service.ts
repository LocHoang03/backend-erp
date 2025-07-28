import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Employee } from './../../entity/employee.entity';
import { Not, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/employees.dto';
import { CloudinaryService } from 'src/configs/cloudinary/cloudinary.service';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EMPLOYEE_REPOSITORY')
    private employeeRepository: Repository<Employee>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({
      where: {
        is_deleted: false,
      },
      relations: ['department', 'position'],
      order: {
        created_at: 'DESC',
      },
    });
  }

  async upload(dataImage: any, id: number): Promise<boolean> {
    const Employee = await this.employeeRepository.findOne({
      where: { id: id },
    });
    if (!Employee) {
      throw new NotFoundException('Không tìm nhân sự này!!');
    }

    if (dataImage.avatar_url && Employee.avatar_url && Employee.avatar_id) {
      this.cloudinaryService.deleteImage(Employee.avatar_id);
    }

    const updatedEmployee = await this.employeeRepository.save({
      ...Employee,
      avatar_id: dataImage.avatar_id,
      avatar_url: dataImage.avatar_url,
    });
    return true;
  }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const exists = await this.employeeRepository.findOne({
      where: [
        { email: createEmployeeDto.email },
        { phone_number: createEmployeeDto.phone_number },
        { national_id: createEmployeeDto.national_id },
      ],
    });

    if (exists) {
      throw new BadRequestException(
        'Thông tin trùng (email | số điện thoại | căn cước công dân)!!!',
      );
    }

    const newEmployee = await this.employeeRepository.save(
      this.employeeRepository.create(createEmployeeDto),
    );
    const fullEmployee = await this.employeeRepository.findOne({
      where: { id: newEmployee.id },
      relations: ['department', 'position'],
    });

    if (!fullEmployee) {
      throw new NotFoundException('Không tìm thấy nhân sự vừa tạo.');
    }

    return fullEmployee;
  }

  async update(updateDto: CreateEmployeeDto): Promise<Employee> {
    const exists = await this.employeeRepository.findOne({
      where: [
        { email: updateDto.email, id: Not(updateDto.id) },
        { phone_number: updateDto.phone_number, id: Not(updateDto.id) },
        { national_id: updateDto.national_id, id: Not(updateDto.id) },
      ],
    });

    if (exists) {
      throw new BadRequestException(
        'Thông tin trùng (email | số điện thoại | căn cước công dân)!!!',
      );
    }

    const Employee = await this.employeeRepository.findOne({
      where: { id: updateDto.id },
    });
    if (!Employee) {
      throw new NotFoundException('Không tìm nhân sự này!!');
    }

    if (updateDto.avatar_url && Employee.avatar_url && Employee.avatar_id) {
      this.cloudinaryService.deleteImage(Employee.avatar_id);
    }

    const updatedEmployee = await this.employeeRepository.save({
      ...Employee,
      ...updateDto,
    });

    const fullEmployee = await this.employeeRepository.findOne({
      where: { id: updatedEmployee.id },
      relations: ['department', 'position'],
    });

    if (!fullEmployee) {
      throw new NotFoundException('Không tìm thấy nhân sự vừa cập nhật.');
    }

    return fullEmployee;
  }

  async delete(id: number): Promise<Employee> {
    if (!id) {
      throw new BadRequestException('Thiếu ID phòng ban!');
    }
    const Employee = await this.employeeRepository.findOne({
      where: { id: id },
    });
    if (!Employee) {
      throw new NotFoundException('Không tìm thấy phòng ban');
    }
    Employee['is_deleted'] = true;
    return await this.employeeRepository.save(Employee);
  }
}
