import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import {
  WarehouseTransfer,
  WarehouseTransferStatus,
} from '../../entity/warehouse-transfers.entity';
import { Repository } from 'typeorm';
import { WarehouseTransferDto } from './dto/warehouses-transfers.dto';
import { WarehouseProduct } from 'src/entity/warehouse-product.entity';
import { WarehouseTransferItem } from 'src/entity/warehouse-transfer-item.entity';

@Injectable()
export class WarehouseTransferService {
  constructor(
    @Inject('WAREHOUSE_TRANSFER_REPOSITORY')
    private warehouseTransferRepository: Repository<WarehouseTransfer>,
    @Inject('WAREHOUSE_PRODUCT_REPOSITORY')
    private readonly warehouseProductRepo: Repository<WarehouseProduct>,
    @Inject('WAREHOUSE_TRANSFER_ITEM_REPOSITORY')
    private readonly warehouseTransferItemRepo: Repository<WarehouseTransferItem>,
  ) {}

  async findAll(): Promise<WarehouseTransfer[]> {
    return this.warehouseTransferRepository.find({
      order: {
        created_at: 'DESC',
      },
      where: { is_deleted: false },
      relations: ['from_warehouse', 'to_warehouse', 'created_by', 'items'],
    });
  }

  async create(
    createWarehouseTransferDto: WarehouseTransferDto,
    warehousesProducts: any[],
  ): Promise<WarehouseTransfer> {
    await Promise.all(
      warehousesProducts.map(async (item) => {
        const prd = await this.warehouseProductRepo.findOne({
          where: {
            product_id: item.product_id,
            warehouse_id: createWarehouseTransferDto.from_warehouse_id,
          },
          relations: ['product'],
        });

        if (!prd) {
          throw new BadRequestException(`Kho xuất không chứa sản phẩm này.`);
        }

        if (prd.quantity < item.quantity) {
          throw new BadRequestException(
            `Sản phẩm "${prd.product.name}" trong kho không đủ. Hiện có ${prd.quantity}, yêu cầu ${item.quantity}.`,
          );
        }
      }),
    );

    const newWarehouseTransfer = await this.warehouseTransferRepository.save(
      this.warehouseTransferRepository.create({
        ...createWarehouseTransferDto,
        from_warehouse: { id: createWarehouseTransferDto.from_warehouse_id },
        to_warehouse: { id: createWarehouseTransferDto.to_warehouse_id },
        created_by: createWarehouseTransferDto.created_by
          ? { id: createWarehouseTransferDto.created_by }
          : undefined,
      }),
    );
    await Promise.all(
      warehousesProducts.map(async (item) => {
        await this.warehouseTransferItemRepo.save(
          this.warehouseTransferItemRepo.create({
            transfer: { id: newWarehouseTransfer.id },
            product: { id: item.product_id },
            quantity: item.quantity,
          }),
        );
      }),
    );

    const fullData = await this.warehouseTransferRepository.findOne({
      where: { id: newWarehouseTransfer.id },
      relations: ['from_warehouse', 'to_warehouse', 'created_by', 'items'],
    });

    if (!fullData) {
      throw new NotFoundException('Không tìm thấy phiếu vừa tạo.');
    }

    return fullData;
  }

  async update(
    updateDto: WarehouseTransferDto,
    warehousesProducts: any[],
  ): Promise<WarehouseTransfer> {
    await Promise.all(
      warehousesProducts.map(async (item) => {
        const prd = await this.warehouseProductRepo.findOne({
          where: {
            product_id: item.id,
            warehouse_id: updateDto.from_warehouse_id,
          },
          relations: ['product'],
        });

        if (!prd) {
          throw new BadRequestException(
            `Không tìm thấy sản phẩm ID ${item.id} trong kho.`,
          );
        }

        if (prd.quantity < item.quantity) {
          throw new BadRequestException(
            `Sản phẩm "${prd.product.name}" trong kho không đủ. Hiện có ${prd.quantity}, yêu cầu ${item.quantity}.`,
          );
        }
      }),
    );
    const exist = await this.warehouseTransferRepository.findOne({
      where: { id: updateDto.id },
    });
    if (!exist) {
      throw new NotFoundException('Không tìm thấy phiếu này!!');
    }

    const updated = this.warehouseTransferRepository.merge(exist, {
      ...updateDto,
      from_warehouse: { id: updateDto.from_warehouse_id },
      to_warehouse: { id: updateDto.to_warehouse_id },
      created_by: exist.created_by,
    });

    const dataUpdated = await this.warehouseTransferRepository.save(updated);

    await this.warehouseTransferItemRepo.delete({
      transfer: { id: dataUpdated.id },
    });

    await Promise.all(
      warehousesProducts.map(async (item) => {
        await this.warehouseTransferItemRepo.save(
          this.warehouseTransferItemRepo.create({
            transfer: { id: dataUpdated.id },
            product: { id: item.product_id },
            quantity: item.quantity,
          }),
        );
      }),
    );

    const fullData = await this.warehouseTransferRepository.findOne({
      where: { id: dataUpdated.id },
      relations: ['from_warehouse', 'to_warehouse', 'created_by', 'items'],
    });

    if (!fullData) {
      throw new NotFoundException('Không tìm thấy phiếu vừa tạo.');
    }

    return fullData;
  }

  async delete(id: number): Promise<WarehouseTransfer> {
    if (!id) {
      throw new BadRequestException('Thiếu ID phiếu!');
    }
    const WarehouseTransfer = await this.warehouseTransferRepository.findOne({
      where: { id: id },
    });
    if (!WarehouseTransfer) {
      throw new NotFoundException('Không tìm thấy phiếu');
    }
    WarehouseTransfer.status = WarehouseTransferStatus.CANCELLED;
    return await this.warehouseTransferRepository.save(WarehouseTransfer);
  }

  async confirm(id: number): Promise<WarehouseTransfer> {
    if (!id) {
      throw new BadRequestException('Thiếu ID phiếu!');
    }

    const warehouseTransfer = await this.warehouseTransferRepository.findOne({
      where: { id },
      relations: ['items', 'from_warehouse', 'to_warehouse'],
    });

    if (!warehouseTransfer) {
      throw new NotFoundException('Không tìm thấy phiếu');
    }

    if (warehouseTransfer.status === WarehouseTransferStatus.COMPLETED) {
      throw new BadRequestException('Phiếu đã hoàn tất rồi!');
    }

    await Promise.all(
      warehouseTransfer.items.map(async (item) => {
        const fromUpdate = await this.warehouseProductRepo.update(
          {
            warehouse_id: warehouseTransfer.from_warehouse.id,
            product_id: item.product.id,
          },
          {
            quantity: () => `quantity - ${item.quantity}`,
          },
        );

        if (fromUpdate.affected === 0) {
          throw new NotFoundException(
            `Không tìm thấy sản phẩm ID ${item.product.id} trong kho chuyển đi`,
          );
        }

        const existingProduct = await this.warehouseProductRepo.findOne({
          where: {
            warehouse_id: warehouseTransfer.to_warehouse.id,
            product_id: item.product.id,
          },
        });

        if (existingProduct) {
          await this.warehouseProductRepo.update(
            { id: existingProduct.id },
            { quantity: () => `quantity + ${item.quantity}` },
          );
        } else {
          await this.warehouseProductRepo.save({
            warehouse_id: warehouseTransfer.to_warehouse.id,
            product_id: item.product.id,
            quantity: item.quantity,
          });
        }
      }),
    );

    warehouseTransfer.status = WarehouseTransferStatus.COMPLETED;
    return await this.warehouseTransferRepository.save(warehouseTransfer);
  }
}
