import { Module } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';

@Module({
  providers: [MessageService, MessageResolver, RepositoryService],
  imports: [RepositoryService],
})
export class MessageModule {}
