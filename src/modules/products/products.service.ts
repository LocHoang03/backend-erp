import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '../../entity/product.entity';
import { Not, Repository } from 'typeorm';
import { ProductDto } from './dto/products.dto';
import { CloudinaryService } from 'src/configs/cloudinary/cloudinary.service';
import { WarehouseProduct } from 'src/entity/warehouse-product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
    private readonly cloudinaryService: CloudinaryService,

    @Inject('WAREHOUSE_PRODUCT_REPOSITORY')
    private readonly warehouseProductRepo: Repository<WarehouseProduct>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      where: {
        is_deleted: false,
      },
      relations: ['warehouse_products', 'category'],
      order: {
        created_at: 'DESC',
      },
    });
  }

  async create(
    createProductDto: ProductDto,
    warehousesProduct: any[],
  ): Promise<Product> {
    const exists = await this.productRepository.findOne({
      where: [{ name: createProductDto.name }],
    });
    if (exists) {
      throw new BadRequestException('Tên sản phẩm đã tồn tại');
    }

    const newProduct = await this.productRepository.save(
      this.productRepository.create(createProductDto),
    );

    const wpEntities = warehousesProduct.map((item) => {
      const wp = new WarehouseProduct();
      wp.product_id = newProduct.id;
      wp.warehouse_id = item.warehouse_id;
      wp.quantity = item.quantity;
      return wp;
    });

    await this.warehouseProductRepo.save(wpEntities);

    const fullProduct = await this.productRepository.findOne({
      where: { id: newProduct.id },
      relations: ['warehouse_products', 'category'],
    });

    if (!fullProduct) {
      throw new NotFoundException('Không tìm thấy sản phẩm vừa tạo.');
    }

    return fullProduct;
  }

  async update(
    updateDto: ProductDto,
    warehousesProduct: any[],
  ): Promise<Product> {
    const { id, name } = updateDto;
    const existing = await this.productRepository.findOne({
      where: [{ name: name, id: Not(id) }],
    });
    if (existing) {
      throw new BadRequestException('Tên sản phẩm đã tồn tại!!');
    }
    const Product = await this.productRepository.findOne({
      where: { id: updateDto.id },
    });
    if (!Product) {
      throw new NotFoundException('Không tìm nhân sự này!!');
    }

    if (updateDto.avatar_url && Product.avatar_url && Product.avatar_id) {
      this.cloudinaryService.deleteImage(Product.avatar_id);
    }

    const merged = this.productRepository.merge(Product, updateDto);
    const updatedProduct = await this.productRepository.save(merged);

    await this.warehouseProductRepo.delete({ product_id: updatedProduct.id });

    const wpEntities = warehousesProduct.map((item) => {
      const wp = new WarehouseProduct();
      wp.product_id = updatedProduct.id;
      wp.warehouse_id = item.warehouse_id;
      wp.quantity = item.quantity;
      return wp;
    });

    await this.warehouseProductRepo.save(wpEntities);

    const fullProduct = await this.productRepository.findOne({
      where: { id: updatedProduct.id },
      relations: ['warehouse_products', 'category'],
    });

    if (!fullProduct) {
      throw new NotFoundException('Không tìm thấy nhân sự vừa cập nhật.');
    }

    return fullProduct;
  }

  async delete(id: number): Promise<Product> {
    if (!id) {
      throw new BadRequestException('Thiếu ID sản phẩm!');
    }
    const Product = await this.productRepository.findOne({
      where: { id: id },
    });
    if (!Product) {
      throw new NotFoundException('Không tìm thấy sản phẩm');
    }
    Product['is_deleted'] = true;
    await this.warehouseProductRepo.delete({ product_id: Product.id });

    return await this.productRepository.save(Product);
  }
}
