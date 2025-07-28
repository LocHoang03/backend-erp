import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';

@Global()
@Module({
  providers: [...databaseProviders, DatabaseService],
  controllers: [DatabaseController],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
