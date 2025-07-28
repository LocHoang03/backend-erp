import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/mql/database.module';
import { userProviders } from './users.providers';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { MailModule } from 'src/utils/mail/mail.module';

@Module({
  imports: [DatabaseModule, MailModule],
  providers: [...userProviders, UserService],
  controllers: [UsersController],
})
export class UserModule {}
