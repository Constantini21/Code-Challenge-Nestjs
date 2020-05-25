import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';

import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';

@Module({
  providers: [MessageService, MessageResolver],
  imports: [RepositoryModule],
})
export class MessageModule {}
