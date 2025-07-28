import { DataSource } from 'typeorm';
import { Category } from 'src/entity/category.entity';

export const categoryProviders = [
  {
    provide: 'CATEGORY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
    inject: ['DB_ERP'],
  },
];
