import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { UserDto, LoginUserDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';
import generator from 'generate-password-ts';
import { MailService } from 'src/utils/mail/mail.service';
import { UserRole } from 'src/entity/user-role.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private readonly mailService: MailService,

    @Inject('USER_ROLE_REPOSITORY')
    private userRoleRepository: Repository<UserRole>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      where: {
        can_query: true,
        is_delete: false,
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<User> {
    if (!id) {
      throw new NotFoundException('Không tìm thấy id!!');
    }
    const user = await this.userRepository.findOne({
      where: {
        is_delete: false,
        id: id,
      },
      relations: ['employee'],
    });

    if (!user) {
      throw new NotFoundException('User không tồn tại!!');
    }
    return user;
  }

  async login(dataLogin: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: [
        { username: dataLogin.username },
        { employee: { email: dataLogin.username } },
      ],
      relations: ['employee', 'userRole'],
    });
    if (!user) {
      throw new NotFoundException(
        'Tên đăng nhập hoặc mật khẩu không chính xác!!',
      );
    }
    const match = await bcrypt.compare(dataLogin.password, user.password);
    if (!match) {
      throw new NotFoundException(
        'Tên đăng nhập hoặc mật khẩu không chính xác!!',
      );
    }
    return user;
  }

  async create(createUserDto: UserDto): Promise<User> {
    const exists = await this.userRepository.findOne({
      where: [
        {
          username: createUserDto.username,
        },
        { employee: { id: createUserDto.assigned_employee_id } },
      ],
    });
    if (exists) {
      throw new BadRequestException(
        'Tên đăng nhập đã tồn tại hoặc người sỡ hữu đã có tài khoản',
      );
    }

    const password =
      createUserDto.password ||
      generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
      });

    const salt = bcrypt.genSaltSync(10);
    const result = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      ...createUserDto,
      password: result,
      employee: { id: createUserDto.assigned_employee_id },
    });

    const newUser = await this.userRepository.save(user);

    if (createUserDto.role_id) {
      await Promise.all(
        createUserDto['role_id'].map(async (roleId) => {
          await this.userRoleRepository.save(
            this.userRoleRepository.create({
              user: { id: newUser.id },
              role: { id: roleId },
            }),
          );
        }),
      );
    }

    const fullData = await this.userRepository.findOne({
      where: { id: newUser.id },
      relations: ['employee'],
    });

    if (!fullData) {
      throw new NotFoundException('Không tìm thấy user vừa tạo.');
    }

    this.mailService.sendMail(
      fullData?.employee.email,
      'Xin chào! Tài khoản của bạn đã được tạo.  username: ' +
        createUserDto.username +
        ' | password: ' +
        password,
    );

    return fullData;
  }

  async update(updateDto: UserDto): Promise<User> {
    const existing = await this.userRepository.findOne({
      where: [
        {
          username: updateDto.username,
          id: Not(updateDto.id),
        },
        {
          employee: { id: updateDto.assigned_employee_id },
          id: Not(updateDto.id),
        },
      ],
    });
    if (existing) {
      throw new BadRequestException(
        'Tên đăng nhập đã tồn tại hoặc người sỡ hữu đã có tài khoản',
      );
    }
    const user = await this.userRepository.findOne({
      where: { id: updateDto.id },
    });
    if (!user) {
      throw new NotFoundException('Không tìm tài khoản!');
    }

    await this.userRepository.save({
      ...updateDto,
      employee: { id: updateDto.assigned_employee_id },
    });

    await this.userRoleRepository.delete({ user_id: updateDto.id });

    if (updateDto.role_id) {
      await Promise.all(
        updateDto['role_id'].map(async (roleId) => {
          await this.userRoleRepository.save(
            this.userRoleRepository.create({
              user: { id: updateDto.id },
              role: { id: roleId },
            }),
          );
        }),
      );
    }

    const fullData = await this.userRepository.findOne({
      where: { id: updateDto.id },
      relations: ['employee'],
    });

    if (!fullData) {
      throw new NotFoundException('Không tìm thấy user vừa cập nhật.');
    }

    return fullData;
  }

  async delete(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('Không tìm thấy quyền');
    }
    user['is_delete'] = true;
    return await this.userRepository.save(user);
  }

  async resetPassword(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('Không tìm thấy tài khoản');
    }

    const password = generator.generate({
      length: 10,
      numbers: true,
      symbols: true,
    });

    const salt = bcrypt.genSaltSync(10);
    const result = await bcrypt.hash(password, salt);
    user.password = result;
    return await this.userRepository.save(user);
  }

  async changePassword(data: any, id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException('Không tìm thấy tài khoản');
    }
    const match = await bcrypt.compare(data.currentPassword, user.password);
    if (!match) {
      throw new NotFoundException('Mật khẩu không chính xác!!');
    }

    const salt = bcrypt.genSaltSync(10);
    const result = await bcrypt.hash(data.newPassword, salt);
    user.password = result;
    return await this.userRepository.save(user);
  }
}
