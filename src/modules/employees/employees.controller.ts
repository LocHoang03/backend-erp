import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  Session,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Employee } from 'src/entity/employee.entity';
import { EmployeeService } from './employees.service';
import { CreateEmployeeDto } from './dto/employees.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/configs/cloudinary/cloudinary.service';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/common/decorators/permission.decorator';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeeService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeesService.findAll();
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('avatar_url'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Session() session: any,
  ): Promise<{ avatar_id: string; avatar_url: string }> {
    const user = session.user;
    if (!user) {
      throw new NotFoundException('User không tồn tại!!');
    }
    if (!file) {
      throw new NotFoundException('File không tồn tại hoặc không hợp lệ!!');
    }
    try {
      const result = await this.cloudinaryService.uploadImage(file);
      await this.employeesService.upload(
        {
          avatar_url: result.secure_url,
          avatar_id: result.public_id,
        },
        user.employee.id,
      );
      session.user = {
        ...user,
        employee: {
          ...user.employee,
          avatar_url: result.secure_url,
          avatar_id: result.public_id,
        },
      };
      return {
        avatar_url: result.secure_url,
        avatar_id: result.public_id,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Upload ảnh thất bại. Server đã xảy ra sự cố!',
      );
    }
  }

  @UseGuards(PermissionGuard)
  @Permission('employees.create')
  @Post('/create')
  @UseInterceptors(FileInterceptor('avatar_url'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ): Promise<Employee> {
    const body = req.body;

    const dtoInstance = plainToInstance(CreateEmployeeDto, body);

    const errors = await validate(dtoInstance);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    if (file) {
      try {
        const result = await this.cloudinaryService.uploadImage(file);
        dtoInstance.avatar_url = result.secure_url;
        dtoInstance.avatar_id = result.public_id;
      } catch (error) {
        console.error(error);
        throw new InternalServerErrorException('Upload ảnh thất bại!');
      }
    }

    return this.employeesService.create(dtoInstance);
  }

  @UseGuards(PermissionGuard)
  @Permission('employees.edit')
  @Put('/update/:id')
  @UseInterceptors(FileInterceptor('avatar_url'))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<Employee> {
    const body = req.body;

    const dtoInstance = plainToInstance(CreateEmployeeDto, {
      ...body,
      id: +id,
    });

    const errors = await validate(dtoInstance);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    if (file) {
      try {
        const result = await this.cloudinaryService.uploadImage(file);
        dtoInstance.avatar_url = result.secure_url;
        dtoInstance.avatar_id = result.public_id;
      } catch (error) {
        console.error(error);
        throw new InternalServerErrorException('Upload ảnh thất bại!');
      }
    }

    return this.employeesService.update(dtoInstance);
  }

  @UseGuards(PermissionGuard)
  @Permission('employees.delete')
  @Put('/delete')
  async delete(@Body('id') id: number): Promise<Employee> {
    return this.employeesService.delete(id);
  }
}
