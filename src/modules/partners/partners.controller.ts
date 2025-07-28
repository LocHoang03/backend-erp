import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { Partner } from 'src/entity/partners.entity';
import { PartnerService } from './partners.service';
import { PartnerDto } from './dto/partners.dto';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/common/decorators/permission.decorator';

@Controller('partners')
export class PartnersController {
  constructor(private readonly PartnersService: PartnerService) {}

  @Get()
  async findAll(): Promise<Partner[]> {
    return this.PartnersService.findAll();
  }

  @UseGuards(PermissionGuard)
  @Permission('partners.create')
  @Post('/create')
  async create(@Body() createPartnerDto: PartnerDto): Promise<Partner> {
    return this.PartnersService.create(createPartnerDto);
  }

  @UseGuards(PermissionGuard)
  @Permission('partners.edit')
  @Put('/update')
  async update(@Body() updatePartnerDto: PartnerDto): Promise<Partner> {
    return this.PartnersService.update(updatePartnerDto);
  }

  @UseGuards(PermissionGuard)
  @Permission('partners.delete')
  @Put('/delete')
  async delete(@Body('id') id: number): Promise<Partner> {
    return this.PartnersService.delete(id);
  }
}
