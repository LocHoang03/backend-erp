import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Product } from 'src/entity/product.entity';
import { ProductService } from './products.service';
import { ProductDto } from './dto/products.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/configs/cloudinary/cloudinary.service';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/common/decorators/permission.decorator';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productService: ProductService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @UseGuards(PermissionGuard)
  @Permission('products.create')
  @Post('/create')
  @UseInterceptors(FileInterceptor('avatar_url'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ): Promise<Product> {
    const body = req.body as any;

    let warehouseProduct: any[] = [];

    if (body?.warehouse_products) {
      warehouseProduct = JSON.parse(body.warehouse_products);
      delete body.warehouse_products;
    }

    const dtoInstance = plainToInstance(ProductDto, body);

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
    return this.productService.create(dtoInstance, warehouseProduct);
  }

  @UseGuards(PermissionGuard)
  @Permission('products.edit')
  @Put('/update/:id')
  @UseInterceptors(FileInterceptor('avatar_url'))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<Product> {
    const body = req.body as any;

    let warehouseProduct: any[] = [];

    if (body?.warehouse_products) {
      warehouseProduct = JSON.parse(body.warehouse_products);
      delete body.warehouse_products;
    }

    const dtoInstance = plainToInstance(ProductDto, {
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

    return this.productService.update(dtoInstance, warehouseProduct);
  }

  @UseGuards(PermissionGuard)
  @Permission('products.delete')
  @Put('/delete')
  async delete(@Body('id') id: number): Promise<Product> {
    return this.productService.delete(id);
  }
}
