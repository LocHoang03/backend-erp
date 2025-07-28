import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Category } from '../../entity/category.entity';
import { Not, Repository } from 'typeorm';
import { CategoryDto } from './dto/categories.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({
      where: {
        is_deleted: false,
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  async create(createCategoryDto: CategoryDto): Promise<Category> {
    const exists = await this.categoryRepository.findOne({
      where: [{ name: createCategoryDto.name }],
    });

    if (exists) {
      throw new BadRequestException('Tên danh mục đã tồn tại');
    }

    const newCategory = await this.categoryRepository.save(
      this.categoryRepository.create(createCategoryDto),
    );

    return newCategory;
  }

  async update(updateDto: CategoryDto): Promise<Category> {
    const { id, name } = updateDto;
    const existing = await this.categoryRepository.findOne({
      where: [{ name: name, id: Not(id) }],
    });
    if (existing) {
      throw new BadRequestException('Tên danh mục đã tồn tại!!');
    }
    const Category = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!Category) {
      throw new NotFoundException('Không tìm thấy danh mục!!');
    }
    return this.categoryRepository.save(Object.assign(Category, updateDto));
  }

  async delete(id: number): Promise<Category> {
    if (!id) {
      throw new BadRequestException('Thiếu ID danh mục!');
    }
    const Category = await this.categoryRepository.findOne({
      where: { id: id },
    });
    if (!Category) {
      throw new NotFoundException('Không tìm thấy danh mục');
    }
    Category['is_deleted'] = true;
    return await this.categoryRepository.save(Category);
  }
}
