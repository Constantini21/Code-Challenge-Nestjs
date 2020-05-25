import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';

import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  providers: [UserService, UserResolver],
  imports: [RepositoryModule],
})
export class UserModule {}
