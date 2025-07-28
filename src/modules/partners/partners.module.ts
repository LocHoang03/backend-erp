import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/mql/database.module';
import { PartnerProviders } from './partners.providers';
import { PartnerService } from './partners.service';
import { PartnersController } from './partners.controller';
import { CloudinaryModule } from 'src/configs/cloudinary/cloudinary.module';

@Module({
  imports: [DatabaseModule],
  providers: [...PartnerProviders, PartnerService],
  controllers: [PartnersController],
})
export class PartnerModule {}
