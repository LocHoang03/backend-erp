import { DataSource } from 'typeorm';
import { Partner } from 'src/entity/partners.entity';

export const PartnerProviders = [
  {
    provide: 'PARTNER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Partner),
    inject: ['DB_ERP'],
  },
];
