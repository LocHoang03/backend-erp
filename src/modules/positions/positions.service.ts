import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Position } from './../../entity/position.entity';
import { Not, Repository } from 'typeorm';
import { CreatePositionDto, UpdatePositionDto } from './dto/positions.dto';

@Injectable()
export class PositionService {
  constructor(
    @Inject('POSITION_REPOSITORY')
    private positionRepository: Repository<Position>,
  ) {}

  async findAll(): Promise<Position[]> {
    return this.positionRepository.find({
      where: {
        is_deleted: false,
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  async create(createPositionDto: CreatePositionDto): Promise<Position> {
    const exists = await this.positionRepository.findOne({
      where: [
        { name: createPositionDto.name },
        { code: createPositionDto.code },
      ],
    });

    if (exists) {
      throw new BadRequestException('Tên hoặc mã(code) vị trí đã tồn tại');
    }

    const newPosition = await this.positionRepository.save(
      this.positionRepository.create(createPositionDto),
    );

    return newPosition;
  }

  async update(updateDto: UpdatePositionDto): Promise<Position> {
    const { id, name, description, code } = updateDto;
    const existing = await this.positionRepository.findOne({
      where: [
        { name: name, id: Not(id) },
        { code: code, id: Not(id) },
      ],
    });
    if (existing) {
      throw new BadRequestException('Tên hoặc mã(code) đã tồn tại!!');
    }
    const Position = await this.positionRepository.findOne({
      where: { id },
    });
    if (!Position) {
      throw new NotFoundException('Không tìm thấy vị trí này!!');
    }
    return this.positionRepository.save(Object.assign(Position, updateDto));
  }

  async delete(id: number): Promise<Position> {
    if (!id) {
      throw new BadRequestException('Thiếu ID vị trí công việc!');
    }
    const Position = await this.positionRepository.findOne({
      where: { id: id },
    });
    if (!Position) {
      throw new NotFoundException('Không tìm thấyvị trí này!!');
    }
    Position['is_deleted'] = true;
    return await this.positionRepository.save(Position);
  }
}
