import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserService } from './user.service';
import { User } from '../database/entities/user.entityl';
import { UserInput } from './graphql/user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  public async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Query(() => User)
  public async getUser(@Args('id') id: number): Promise<User> {
    return this.userService.getUser(id);
  }

  @Mutation(() => User)
  public async createOrLogin(@Args('args') args: UserInput): Promise<User> {
    return this.userService.createOrLogin(args);
  }
}
