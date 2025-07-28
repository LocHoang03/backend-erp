import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { User } from 'src/entity/user.entity';
import { UserDto, LoginUserDto } from './dto/users.dto';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/common/decorators/permission.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/whoami')
  async whoami(
    @Session() session: any,
  ): Promise<{ isLogin: boolean; dataUser: {} }> {
    if (!session.user)
      return {
        isLogin: false,
        dataUser: {},
      };
    const user = await this.userService.findOne(session.user.id);

    const { password, ...dataUser } = user;

    const permissions = Array.from(
      new Set(
        dataUser.userRole?.flatMap(
          (ur) =>
            ur.role?.rolePermissions?.map((rp) => rp.permission?.name) || [],
        ) || [],
      ),
    );

    const dataInfo = {
      ...dataUser,
      userRole: permissions,
    };
    session.user = dataInfo;

    return {
      isLogin: true,
      dataUser: dataInfo,
    };
  }
  @Post('/login')
  async login(
    @Body() dataDto: LoginUserDto,
    @Session() session: any,
  ): Promise<{ success: boolean; dataUser: {} }> {
    const user = await this.userService.login(dataDto);

    const { password, ...dataUser } = user;

    const permissions = Array.from(
      new Set(
        dataUser.userRole?.flatMap(
          (ur) =>
            ur.role?.rolePermissions?.map((rp) => rp.permission?.name) || [],
        ) || [],
      ),
    );

    const dataInfo = {
      ...dataUser,
      userRole: permissions,
    };
    session.user = dataInfo;

    return {
      success: true,
      dataUser: dataInfo,
    };
  }

  @Post('logout')
  logout(@Session() session: any) {
    if (session.user) {
      for (const key in session) {
        delete session[key];
      }
    }
  }

  @UseGuards(PermissionGuard)
  @Permission('users.create')
  @Post('/create')
  async create(@Body() createUserDto: UserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(PermissionGuard)
  @Permission('users.edit')
  @Put('/update')
  async update(@Body() updateUserDto: UserDto): Promise<User> {
    return this.userService.update(updateUserDto);
  }

  @UseGuards(PermissionGuard)
  @Permission('users.delete')
  @Put('/delete')
  async blockOrUnlock(@Body('id') id: number): Promise<User> {
    return this.userService.delete(id);
  }

  @UseGuards(PermissionGuard)
  @Permission('users.edit')
  @Put('/reset')
  async reset(@Body('id') id: number): Promise<User> {
    return this.userService.resetPassword(id);
  }

  @Post('/change')
  async changePassword(
    @Body() data: any,
    @Session() session: any,
  ): Promise<User> {
    const user = session.user;
    if (!user) {
      throw new NotFoundException('User không tồn tại!!');
    }
    return this.userService.changePassword(data, user.id);
  }
}
