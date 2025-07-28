import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Salary, SalaryStatus } from '../../entity/salary.entity';
import { Not, Repository } from 'typeorm';
import { SalaryDto } from './dto/salaries.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class SalaryService {
  constructor(
    @Inject('SALARY_REPOSITORY')
    private salaryRepository: Repository<Salary>,
  ) {}

  async findAll(): Promise<Salary[]> {
    return this.salaryRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  async create(createSalaryDto: SalaryDto): Promise<Salary> {
    const exists = await this.salaryRepository.findOne({
      where: {
        salary_month: createSalaryDto.salary_month,
        employee: { id: createSalaryDto.employee_id },
      },
    });

    if (exists) {
      throw new BadRequestException('Nhân sự này đã có bảng lương kỳ này!!');
    }

    const newSalary = await this.salaryRepository.save(
      this.salaryRepository.create({
        ...createSalaryDto,
        employee: { id: createSalaryDto.employee_id },
      }),
    );

    const fullSalary = await this.salaryRepository.findOne({
      where: { id: newSalary.id },
      relations: ['employee'],
    });

    if (!fullSalary) {
      throw new NotFoundException('Không tìm thấy phần bảng lương vừa tạo.');
    }

    return fullSalary;
  }

  async update(updateDto: SalaryDto): Promise<Salary> {
    if (!updateDto.id) {
      throw new BadRequestException('Id bảng lương không tồn tại!!');
    }
    const existing = await this.salaryRepository.findOne({
      where: {
        salary_month: updateDto.salary_month,
        employee: { id: updateDto.employee_id },
        id: Not(updateDto.id),
      },
    });
    if (existing) {
      throw new BadRequestException('Nhân sự này đã có bảng lương kỳ này!!');
    }
    const Salary = await this.salaryRepository.findOne({
      where: { id: updateDto.id },
    });
    if (!Salary) {
      throw new NotFoundException('Không tìm thấy bảng lương này!!');
    }
    const updated = this.salaryRepository.merge(Salary, {
      ...updateDto,
      employee: { id: updateDto.employee_id },
    });

    await this.salaryRepository.save(updated);

    const fullSalary = await this.salaryRepository.findOne({
      where: { id: updated.id },
      relations: ['employee'],
    });

    if (!fullSalary) {
      throw new NotFoundException(
        'Không tìm thấy phần bảng lương vừa cập nhật.',
      );
    }

    return fullSalary;
  }

  async confirm(id: number): Promise<Salary> {
    if (!id) {
      throw new BadRequestException('Thiếu ID bảng lương!');
    }

    const salary = await this.salaryRepository.findOne({
      where: { id },
      relations: ['employee'],
    });

    if (!salary) {
      throw new NotFoundException('Không tìm bảng lương');
    }

    salary.status = SalaryStatus.PAID;
    return await this.salaryRepository.save(salary);
  }
}
