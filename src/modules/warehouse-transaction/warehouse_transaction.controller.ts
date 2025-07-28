import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
  Session,
} from '@nestjs/common';
import { WarehouseTransaction } from 'src/entity/warehouse_transactions.entity';
import { WarehouseTransactionService } from './warehouse_transaction.service';
import { WarehouseTransactionDto } from './dto/warehouse_transaction.dto';
import { plainToInstance } from 'class-transformer';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/common/decorators/permission.decorator';

@Controller('warehouse-transactions')
export class WarehouseTransactionsController {
  constructor(
    private readonly WarehouseTransactionService: WarehouseTransactionService,
  ) {}

  @Get()
  async findAll(): Promise<WarehouseTransaction[]> {
    return this.WarehouseTransactionService.findAll();
  }

  @UseGuards(PermissionGuard)
  @Permission('warehouse-transactions.create')
  @Post('/create')
  async create(
    @Req() req: Request,
    @Session() session: any,
  ): Promise<WarehouseTransaction> {
    const body = { ...req.body } as any;
    const warehousesProducts = body.warehouse_products;

    delete body.warehouse_products;

    const dtoInstance = plainToInstance(WarehouseTransactionDto, body);
    return this.WarehouseTransactionService.create(
      dtoInstance,
      warehousesProducts,
      session.user,
    );
  }

  @UseGuards(PermissionGuard)
  @Permission('warehouse-transactions.edit')
  @Put('/update')
  async update(@Req() req: Request): Promise<WarehouseTransaction> {
    const body = { ...req.body } as any;
    const warehousesProducts = body.warehouse_products;

    delete body.warehouse_products;

    const dtoInstance = plainToInstance(WarehouseTransactionDto, body);

    return this.WarehouseTransactionService.update(
      dtoInstance,
      warehousesProducts,
    );
  }

  @UseGuards(PermissionGuard)
  @Permission('warehouse-transactions.delete')
  @Put('/delete')
  async delete(@Body('id') id: number): Promise<WarehouseTransaction> {
    return this.WarehouseTransactionService.delete(id);
  }

  @UseGuards(PermissionGuard)
  @Permission('warehouse-transactions.edit')
  @Put('/confirm')
  async confirm(@Body('id') id: number): Promise<WarehouseTransaction> {
    return this.WarehouseTransactionService.confirm(id);
  }
}
