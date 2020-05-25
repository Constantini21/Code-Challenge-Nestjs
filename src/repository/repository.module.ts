import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RepositoryService } from './repository.service';
import { User } from '../database/entities/user.entityl';
import { Message } from '../database/entities/message.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Message])],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
