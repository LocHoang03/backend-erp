import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { Warehouse } from 'src/entity/warehouse.entity';
import { WarehouseService } from './warehouses.service';
import { WarehouseDto } from './dto/warehouses.dto';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/common/decorators/permission.decorator';

@Controller('warehouses')
export class WarehousesController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Get()
  async findAll(): Promise<Warehouse[]> {
    return this.warehouseService.findAll();
  }

  @UseGuards(PermissionGuard)
  @Permission('warehouses.create')
  @Post('/create')
  async create(@Body() createWarehouseDto: WarehouseDto): Promise<Warehouse> {
    return this.warehouseService.create(createWarehouseDto);
  }

  @UseGuards(PermissionGuard)
  @Permission('warehouses.edit')
  @Put('/update')
  async update(@Body() updateWarehouseDto: WarehouseDto): Promise<Warehouse> {
    return this.warehouseService.update(updateWarehouseDto);
  }

  @UseGuards(PermissionGuard)
  @Permission('warehouses.delete')
  @Put('/delete')
  async delete(@Body('id') id: number): Promise<Warehouse> {
    return this.warehouseService.delete(id);
  }
}
