import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { RoleService } from './roles.service';
import { Role } from 'src/entity/role.entity';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/common/decorators/permission.decorator';
import { RoleDto } from './dto/roles.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @UseGuards(PermissionGuard)
  @Permission('roles.create')
  @Post('/create')
  async create(@Body() createRoleDto: RoleDto): Promise<Role> {
    // const body = { ...req.body } as any;
    console.log(createRoleDto);
    return this.roleService.create(createRoleDto);
  }

  @UseGuards(PermissionGuard)
  @Permission('roles.edit')
  @Put('/update')
  async update(@Body() updateRoleDto: RoleDto): Promise<Role> {
    return this.roleService.update(updateRoleDto);
  }

  @UseGuards(PermissionGuard)
  @Permission('roles.delete')
  @Put('/delete')
  async delete(@Body('id') id: number): Promise<Role> {
    return this.roleService.delete(id);
  }
}
