import { Module } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  providers: [UserService, UserResolver, RepositoryService],
  imports: [RepositoryService],
})
export class UserModule {}
