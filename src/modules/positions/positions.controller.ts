import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { Position } from 'src/entity/position.entity';
import { PositionService } from './positions.service';
import { CreatePositionDto, UpdatePositionDto } from './dto/positions.dto';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/common/decorators/permission.decorator';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionService: PositionService) {}

  @Get()
  async findAll(): Promise<Position[]> {
    return this.positionService.findAll();
  }

  @UseGuards(PermissionGuard)
  @Permission('positions.create')
  @Post('/create')
  async create(
    @Body() createPositionDto: CreatePositionDto,
  ): Promise<Position> {
    return this.positionService.create(createPositionDto);
  }

  @UseGuards(PermissionGuard)
  @Permission('positions.edit')
  @Put('/update')
  async update(
    @Body() updatePositionDto: UpdatePositionDto,
  ): Promise<Position> {
    return this.positionService.update(updatePositionDto);
  }

  @UseGuards(PermissionGuard)
  @Permission('positions.delete')
  @Put('/delete')
  async delete(@Body('id') id: number): Promise<Position> {
    return this.positionService.delete(id);
  }
}
