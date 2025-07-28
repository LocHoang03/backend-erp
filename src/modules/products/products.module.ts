import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/mql/database.module';
import { ProductProviders } from './products.providers';
import { ProductService } from './products.service';
import { ProductsController } from './products.controller';
import { CloudinaryModule } from 'src/configs/cloudinary/cloudinary.module';

@Module({
  imports: [DatabaseModule, CloudinaryModule],
  providers: [...ProductProviders, ProductService],
  controllers: [ProductsController],
})
export class ProductModule {}
