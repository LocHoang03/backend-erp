import { WarehouseTransactionDto } from './dto/warehouse_transaction.dto';
import {
  WarehouseTransaction,
  WarehouseTransactionStatus,
} from './../../entity/warehouse_transactions.entity';
import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { WarehouseProduct } from 'src/entity/warehouse-product.entity';
import { WarehouseTransactionItem } from 'src/entity/warehouse_transaction_items.entity';
import { Product } from 'src/entity/product.entity';

@Injectable()
export class WarehouseTransactionService {
  constructor(
    @Inject('WAREHOUSE_TRANSACTION_REPOSITORY')
    private warehouseTransactionRepository: Repository<WarehouseTransaction>,
    @Inject('WAREHOUSE_PRODUCT_REPOSITORY')
    private readonly warehouseProductRepo: Repository<WarehouseProduct>,
    @Inject('WAREHOUSE_TRANSACTION_ITEM_REPOSITORY')
    private readonly warehouseTransactionItemRepo: Repository<WarehouseTransactionItem>,
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepo: Repository<Product>,
  ) {}

  async findAll(): Promise<WarehouseTransaction[]> {
    return this.warehouseTransactionRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  async create(
    createWarehouseTransactionDto: WarehouseTransactionDto,
    warehousesProducts: any[],
    userCreate: any,
  ): Promise<WarehouseTransaction> {
    if (createWarehouseTransactionDto.type !== 'Nhập kho') {
      await Promise.all(
        warehousesProducts.map(async (item) => {
          const prd = await this.warehouseProductRepo.findOne({
            where: {
              product_id: item.product_id,
              warehouse_id: createWarehouseTransactionDto.warehouse_id,
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
    }

    const newWarehouseTransaction =
      await this.warehouseTransactionRepository.save(
        this.warehouseTransactionRepository.create({
          ...createWarehouseTransactionDto,
          warehouse: { id: createWarehouseTransactionDto.warehouse_id },
          partner: { id: createWarehouseTransactionDto.partner_id },
          created_by: userCreate,
        }),
      );
    await Promise.all(
      warehousesProducts.map(async (item) => {
        const product = await this.productRepo.findOne({
          where: { id: item.product_id },
        });

        if (!product) throw new NotFoundException('Sản phẩm không tồn tại');
        await this.warehouseTransactionItemRepo.save(
          this.warehouseTransactionItemRepo.create({
            product: { id: item.product_id },
            quantity: item.quantity,
            transaction: { id: newWarehouseTransaction.id },
            unit_price: product.unit_price,
            total_price: product.unit_price * item.quantity,
          }),
        );
      }),
    );

    const fullData = await this.warehouseTransactionRepository.findOne({
      where: { id: newWarehouseTransaction.id },
      relations: ['warehouse', 'partner', 'created_by', 'items'],
    });

    if (!fullData) {
      throw new NotFoundException('Không tìm thấy phiếu vừa tạo.');
    }

    return fullData;
  }

  async update(
    updateDto: WarehouseTransactionDto,
    warehousesProducts: any[],
  ): Promise<WarehouseTransaction> {
    if (updateDto.type !== 'Nhập kho') {
      await Promise.all(
        warehousesProducts.map(async (item) => {
          const prd = await this.warehouseProductRepo.findOne({
            where: {
              product_id: item.id,
              warehouse_id: updateDto.warehouse_id,
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
    }
    const exist = await this.warehouseTransactionRepository.findOne({
      where: { id: updateDto.id },
    });
    if (!exist) {
      throw new NotFoundException('Không tìm thấy phiếu này!!');
    }

    const updated = this.warehouseTransactionRepository.merge(exist, {
      ...updateDto,
      warehouse: { id: updateDto.warehouse_id },
      partner: { id: updateDto.partner_id },
    });

    const dataUpdated = await this.warehouseTransactionRepository.save(updated);

    await this.warehouseTransactionItemRepo.delete({
      transaction: { id: updateDto.id },
    });

    await Promise.all(
      warehousesProducts.map(async (item) => {
        const product = await this.productRepo.findOne({
          where: { id: item.product_id },
        });
        if (!product) throw new NotFoundException('Sản phẩm không tồn tại');
        await this.warehouseTransactionItemRepo.save(
          this.warehouseTransactionItemRepo.create({
            product: { id: item.product_id },
            quantity: item.quantity,
            transaction: { id: updateDto.id },
            unit_price: product.unit_price,
            total_price: product.unit_price * item.quantity,
          }),
        );
      }),
    );

    const fullData = await this.warehouseTransactionRepository.findOne({
      where: { id: dataUpdated.id },
      relations: ['warehouse', 'partner', 'created_by', 'items'],
    });

    if (!fullData) {
      throw new NotFoundException('Không tìm thấy phiếu vừa cập nhật.');
    }

    return fullData;
  }

  async delete(id: number): Promise<WarehouseTransaction> {
    if (!id) {
      throw new BadRequestException('Thiếu ID phiếu!');
    }
    const WarehouseTransaction =
      await this.warehouseTransactionRepository.findOne({
        where: { id: id },
      });
    if (!WarehouseTransaction) {
      throw new NotFoundException('Không tìm thấy phiếu');
    }
    WarehouseTransaction.status = WarehouseTransactionStatus.CANCELLED;
    return await this.warehouseTransactionRepository.save(WarehouseTransaction);
  }

  async confirm(id: number): Promise<WarehouseTransaction> {
    if (!id) throw new BadRequestException('Thiếu ID phiếu!');

    const transaction = await this.warehouseTransactionRepository.findOne({
      where: { id },
      relations: ['warehouse', 'partner', 'created_by', 'items'],
    });

    if (!transaction) throw new NotFoundException('Không tìm thấy phiếu');

    const { type, items, warehouse } = transaction;

    if (type === 'Xuất kho') {
      for (const item of items) {
        const prd = await this.warehouseProductRepo.findOne({
          where: {
            product_id: item.product.id,
            warehouse_id: warehouse.id,
          },
          relations: ['product'],
        });

        if (!prd) {
          throw new BadRequestException(`Kho xuất không chứa sản phẩm.`);
        }

        if (prd.quantity < item.quantity) {
          throw new BadRequestException(
            `Sản phẩm "${prd.product.name}" trong kho không đủ. Hiện có ${prd.quantity}, yêu cầu ${item.quantity}.`,
          );
        }
      }

      for (const item of items) {
        const result = await this.warehouseProductRepo.update(
          {
            warehouse_id: warehouse.id,
            product_id: item.product.id,
          },
          {
            quantity: () => `quantity - ${item.quantity}`,
          },
        );

        if (result.affected === 0) {
          throw new NotFoundException(
            `Không tìm thấy sản phẩm ID ${item.product.id} trong kho xuất`,
          );
        }
      }
    } else {
      for (const item of items) {
        const existing = await this.warehouseProductRepo.findOne({
          where: {
            warehouse_id: warehouse.id,
            product_id: item.product.id,
          },
        });

        if (existing) {
          await this.warehouseProductRepo.update(
            { id: existing.id },
            { quantity: () => `quantity + ${item.quantity}` },
          );
        } else {
          await this.warehouseProductRepo.save({
            warehouse_id: warehouse.id,
            product_id: item.product.id,
            quantity: item.quantity,
          });
        }
      }
    }

    transaction.status = WarehouseTransactionStatus.COMPLETED;

    return await this.warehouseTransactionRepository.save(transaction);
  }
}
