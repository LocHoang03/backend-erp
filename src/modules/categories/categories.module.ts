import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/mql/database.module';
import { categoryProviders } from './categories.providers';
import { CategoryService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...categoryProviders, CategoryService],
  controllers: [CategoriesController],
})
export class CategoryModule {}
