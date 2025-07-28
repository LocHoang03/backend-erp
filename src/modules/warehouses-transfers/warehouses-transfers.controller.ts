import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WarehouseTransfer } from 'src/entity/warehouse-transfers.entity';
import { WarehouseTransferService } from './warehouses-transfers.service';
import { WarehouseTransferDto } from './dto/warehouses-transfers.dto';
import { plainToInstance } from 'class-transformer';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/common/decorators/permission.decorator';

@Controller('warehouse-transfers')
export class WarehouseTransfersController {
  constructor(
    private readonly warehouseTransferService: WarehouseTransferService,
  ) {}

  @Get()
  async findAll(): Promise<WarehouseTransfer[]> {
    return this.warehouseTransferService.findAll();
  }

  @UseGuards(PermissionGuard)
  @Permission('warehouses-transfers.create')
  @Post('/create')
  async create(@Req() req: Request): Promise<WarehouseTransfer> {
    const body = { ...req.body } as any;
    const warehousesProducts = body.warehouse_products;

    delete body.warehouse_products;

    const dtoInstance = plainToInstance(WarehouseTransferDto, body);

    return this.warehouseTransferService.create(
      dtoInstance,
      warehousesProducts,
    );
  }

  @UseGuards(PermissionGuard)
  @Permission('warehouses-transfers.edit')
  @Put('/update')
  async update(@Req() req: Request): Promise<WarehouseTransfer> {
    const body = { ...req.body } as any;
    const warehousesProducts = body.warehouse_products;

    delete body.warehouse_products;

    const dtoInstance = plainToInstance(WarehouseTransferDto, body);

    return this.warehouseTransferService.update(
      dtoInstance,
      warehousesProducts,
    );
  }

  @UseGuards(PermissionGuard)
  @Permission('warehouses-transfers.delete')
  @Put('/delete')
  async delete(@Body('id') id: number): Promise<WarehouseTransfer> {
    return this.warehouseTransferService.delete(id);
  }

  @UseGuards(PermissionGuard)
  @Permission('warehouses-transfers.edit')
  @Put('/confirm')
  async confirm(@Body('id') id: number): Promise<WarehouseTransfer> {
    return this.warehouseTransferService.confirm(id);
  }
}
