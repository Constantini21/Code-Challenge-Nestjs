import { Injectable } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';

import { User } from '../database/entities/user.entityl';
import { UserInput } from './graphql/user.input';

@Injectable()
export class UserService {
  constructor(private readonly repositoryService: RepositoryService) {}

  public async getUsers(): Promise<User[]> {
    const users = await this.repositoryService.userRepository().find();
    return users;
  }

  public async getUser(id: number): Promise<User> {
    const user = await this.repositoryService.userRepository().findOne(id);
    return user;
  }

  public async createOrLogin(args: UserInput): Promise<User> {
    let user = await this.repositoryService.userRepository().findOne({
      email: args.email.toLowerCase().trim(),
    });

    if (!user) {
      user = this.repositoryService.userRepository().create({
        email: args.email.toLowerCase().trim(),
      });

      await this.repositoryService.userRepository().save(user);
    }

    return user;
  }
}
