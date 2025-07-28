import { Attendance } from './../../entity/attendances.entity';
import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { AttendanceDto, AttendanceStatus } from './dto/attendances.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class AttendanceService {
  constructor(
    @Inject('ATTENDANCES_REPOSITORY')
    private attendanceRepository: Repository<Attendance>,
  ) {}

  async findAll(): Promise<Attendance[]> {
    return this.attendanceRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  async create(createAttendanceDto: AttendanceDto): Promise<Attendance> {
    const exists = await this.attendanceRepository.findOne({
      where: {
        work_date: createAttendanceDto.work_date,
        employee: { id: createAttendanceDto.employee_id },
      },
    });

    if (exists) {
      throw new BadRequestException('Nhân sự này đã check in hôm nay!!');
    }

    let status;
    const onTime = dayjs(`${createAttendanceDto.work_date}T08:00:00`);
    const checkInTime = dayjs(
      `${createAttendanceDto.work_date}T${createAttendanceDto.check_in}`,
    );
    if (!createAttendanceDto.check_in) {
      status = AttendanceStatus.ABSENT;
    } else {
      if (checkInTime.isAfter(onTime)) {
        status = AttendanceStatus.LATE;
      } else {
        status = AttendanceStatus.ON_TIME;
      }
    }
    const newAttendance = await this.attendanceRepository.save(
      this.attendanceRepository.create({
        ...createAttendanceDto,
        employee: { id: createAttendanceDto.employee_id },
        status: status,
      }),
    );

    const fullAttendances = await this.attendanceRepository.findOne({
      where: { id: newAttendance.id },
      relations: ['employee'],
    });

    if (!fullAttendances) {
      throw new NotFoundException('Không tìm thấy phần chấm công vừa tạo.');
    }

    return fullAttendances;
  }

  async update(updateDto: AttendanceDto): Promise<Attendance> {
    const exists = await this.attendanceRepository.findOne({
      where: {
        work_date: updateDto.work_date,
        employee: { id: updateDto.employee_id },
        id: Not(updateDto.id),
      },
    });

    if (exists) {
      throw new BadRequestException('Nhân sự này đã check in hôm nay!!');
    }
    const Attendance = await this.attendanceRepository.findOne({
      where: { id: updateDto.id },
    });
    if (!Attendance) {
      throw new NotFoundException('Không tìm thấy phần chấm công này!!');
    }

    let status;
    const onTime = dayjs(`${updateDto.work_date}T08:00:00`);
    const checkInTime = dayjs(`${updateDto.work_date}T${updateDto.check_in}`);
    if (!updateDto.check_in) {
      status = AttendanceStatus.ABSENT;
    } else {
      if (checkInTime.isAfter(onTime)) {
        status = AttendanceStatus.LATE;
      } else {
        status = AttendanceStatus.ON_TIME;
      }
    }
    const updated = this.attendanceRepository.merge(Attendance, {
      ...updateDto,
      employee: { id: updateDto.employee_id },
      status: status,
    });

    await this.attendanceRepository.save(updated);

    const fullAttendances = await this.attendanceRepository.findOne({
      where: { id: updated.id },
      relations: ['employee'],
    });

    if (!fullAttendances) {
      throw new NotFoundException(
        'Không tìm thấy phần chấm công vừa cập nhật.',
      );
    }

    return fullAttendances;
  }
}
