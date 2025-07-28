import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { Category } from 'src/entity/category.entity';
import { CategoryService } from './categories.service';
import { CategoryDto } from './dto/categories.dto';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/common/decorators/permission.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly CategoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.CategoryService.findAll();
  }

  @UseGuards(PermissionGuard)
  @Permission('category-products.create')
  @Post('/create')
  async create(@Body() createCategoryDto: CategoryDto): Promise<Category> {
    return this.CategoryService.create(createCategoryDto);
  }

  @UseGuards(PermissionGuard)
  @Permission('category-products.edit')
  @Put('/update')
  async update(@Body() updateCategoryDto: CategoryDto): Promise<Category> {
    return this.CategoryService.update(updateCategoryDto);
  }

  @UseGuards(PermissionGuard)
  @Permission('category-products.delete')
  @Put('/delete')
  async delete(@Body('id') id: number): Promise<Category> {
    return this.CategoryService.delete(id);
  }
}
