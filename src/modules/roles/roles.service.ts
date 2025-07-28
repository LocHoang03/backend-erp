import { Role } from './../../entity/role.entity';
import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { RoleDto } from './dto/roles.dto';
import { Permission } from 'src/entity/permission.entity';
import { RolePermission } from 'src/entity/role-permission.entity';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private roleRepository: Repository<Role>,
    @Inject('PERMISSION_REPOSITORY')
    private permissionRepo: Repository<Permission>,
    @Inject('PERMISSION_ROLE_REPOSITORY')
    private readonly permissionRoleRepo: Repository<RolePermission>,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find({
      order: {
        created_at: 'DESC',
      },
      relations: ['rolePermissions'],
    });
  }

  async create(dataCreateDto: RoleDto): Promise<Role> {
    const exists = await this.roleRepository.findOne({
      where: [{ name: dataCreateDto.name }],
    });

    if (exists) {
      throw new BadRequestException('Tên vai trò đã tồn tại!');
    }
    const { permission_id, ...data } = dataCreateDto;
    const newRole = await this.roleRepository.save(
      this.roleRepository.create({
        ...data,
        allow_delete: true,
      }),
    );

    await Promise.all(
      permission_id.map(async (item) => {
        const permission = await this.permissionRepo.findOne({
          where: { id: item },
        });

        if (!permission) throw new NotFoundException('Quyền không tồn tại');
        await this.permissionRoleRepo.save(
          this.permissionRoleRepo.create({
            permission_id: item,
            role_id: newRole.id,
          }),
        );
      }),
    );

    const fullData = await this.roleRepository.findOne({
      where: { id: newRole.id },
      relations: ['rolePermissions'],
    });

    if (!fullData) {
      throw new NotFoundException('Không tìm thấy vai trò vừa tạo.');
    }

    return fullData;
  }

  async update(updateDto: RoleDto): Promise<Role> {
    const existing = await this.roleRepository.findOne({
      where: { name: updateDto.name, id: Not(updateDto.id) },
    });
    if (existing) {
      throw new BadRequestException('Tên vai trò đã tồn tại!!');
    }
    const roles = await this.roleRepository.findOne({
      where: { id: updateDto.id },
    });
    if (!roles) {
      throw new NotFoundException('Không tìm thấy vai trò này!!');
    }

    const { permission_id, ...data } = updateDto;

    const updated = await this.roleRepository.save({
      ...data,
    });
    await this.permissionRoleRepo.delete({ role_id: updateDto.id });

    await Promise.all(
      permission_id.map(async (item) => {
        const permission = await this.permissionRepo.findOne({
          where: { id: item },
        });

        if (!permission) throw new NotFoundException('Quyền không tồn tại');
        await this.permissionRoleRepo.save(
          this.permissionRoleRepo.create({
            permission_id: item,
            role_id: updateDto.id,
          }),
        );
      }),
    );

    const fullData = await this.roleRepository.findOne({
      where: { id: updateDto.id },
      relations: ['rolePermissions'],
    });

    if (!fullData) {
      throw new NotFoundException('Không tìm thấy vai trò vừa cập nhật.');
    }

    return fullData;
  }

  async delete(id: number): Promise<Role> {
    if (!id) {
      throw new BadRequestException('Thiếu ID vai trò!');
    }
    const role = await this.roleRepository.findOne({
      where: { id: id },
    });
    if (!role) {
      throw new NotFoundException('Không tìm thấy vai trò này!!');
    }
    await this.permissionRoleRepo.delete({ role_id: id });
    await this.roleRepository.delete({ id: id });

    return role;
  }
}
