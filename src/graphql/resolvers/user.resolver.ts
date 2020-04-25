import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { RepositoryService } from '../../repository/repository.service';
import { User } from '../../database/entities/user';
import { UserSchema } from '../schemas/user.schema';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly repositoryService: RepositoryService) {}

  @Query(() => [User])
  public async getUsers(): Promise<User[]> {
    return this.repositoryService.userRepository.find();
  }

  @Query(() => User)
  public async getUser(@Args('id') id: number): Promise<User> {
    return this.repositoryService.userRepository.findOne(id);
  }

  @Mutation(() => User)
  public async createUser(@Args('data') userSchema: UserSchema): Promise<User> {
    const user = this.repositoryService.userRepository.create({
      email: userSchema.email,
    });

    return this.repositoryService.userRepository.save(user);
  }
}
