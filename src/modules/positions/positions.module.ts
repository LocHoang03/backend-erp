import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/mql/database.module';
import { positionProviders } from './positions.providers';
import { PositionService } from './positions.service';
import { PositionsController } from './positions.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...positionProviders, PositionService],
  controllers: [PositionsController],
})
export class PositionModule {}
