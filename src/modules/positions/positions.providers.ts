import { DataSource } from 'typeorm';
import { Position } from './../../entity/position.entity';

export const positionProviders = [
  {
    provide: 'POSITION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Position),
    inject: ['DB_ERP'],
  },
];
