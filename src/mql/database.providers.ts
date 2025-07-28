import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DB_ERP',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'loc123',
        database: 'erp_mini',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      const ds = await dataSource.initialize();

      await ds.synchronize();

      return ds;
    },
  },
];
