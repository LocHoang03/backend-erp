import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DB_ERP',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: process.env.DB_TYPE as any,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306', 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      const ds = await dataSource.initialize();

      await ds.synchronize();

      return ds;
    },
  },
];
