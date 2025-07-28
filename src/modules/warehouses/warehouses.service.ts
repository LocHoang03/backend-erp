import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Warehouse } from '../../entity/warehouse.entity';
import { Not, Repository } from 'typeorm';
import { WarehouseDto } from './dto/warehouses.dto';

@Injectable()
export class WarehouseService {
  constructor(
    @Inject('WAREHOUSE_REPOSITORY')
    private warehouseRepository: Repository<Warehouse>,
  ) {}

  async findAll(): Promise<Warehouse[]> {
    return this.warehouseRepository.find({
      where: {
        is_deleted: false,
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  async create(createWarehouseDto: WarehouseDto): Promise<Warehouse> {
    const exists = await this.warehouseRepository.findOne({
      where: [{ name: createWarehouseDto.name }],
    });

    if (exists) {
      throw new BadRequestException('Tên kho đã tồn tại');
    }

    const newWarehouse = await this.warehouseRepository.save(
      this.warehouseRepository.create(createWarehouseDto),
    );

    return newWarehouse;
  }

  async update(updateDto: WarehouseDto): Promise<Warehouse> {
    const { id, name } = updateDto;
    const existing = await this.warehouseRepository.findOne({
      where: [{ name: name, id: Not(id) }],
    });
    if (existing) {
      throw new BadRequestException('Tên kho đã tồn tại');
    }
    const Warehouse = await this.warehouseRepository.findOne({
      where: { id },
    });
    if (!Warehouse) {
      throw new NotFoundException('Không tìm thấy kho này!!');
    }
    return this.warehouseRepository.save(Object.assign(Warehouse, updateDto));
  }

  async delete(id: number): Promise<Warehouse> {
    if (!id) {
      throw new BadRequestException('Thiếu ID kho!');
    }
    const Warehouse = await this.warehouseRepository.findOne({
      where: { id: id },
    });
    if (!Warehouse) {
      throw new NotFoundException('Không tìm thấy kho');
    }
    Warehouse['is_deleted'] = true;
    return await this.warehouseRepository.save(Warehouse);
  }
}
