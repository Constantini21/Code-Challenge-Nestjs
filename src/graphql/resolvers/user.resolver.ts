import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { RepositoryService } from '../../repository/repository.service';
import { User } from '../../database/entities/user';
import { UserSchema } from '../schemas/user.schema';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly repositoryService: RepositoryService) {}

  @Query(() => [User])
  public async GetUsers(): Promise<User[]> {
    return this.repositoryService.userRepository.find();
  }

  @Query(() => User)
  public async GetUser(@Args('id') id: number): Promise<User> {
    return this.repositoryService.userRepository.findOne(id);
  }

  @Mutation(() => User)
  public async CreateOrLoginUser(
    @Args('data') userSchema: UserSchema,
  ): Promise<User> {
    let user = await this.repositoryService.userRepository.findOne({
      email: userSchema.email.toLowerCase().trim(),
    });

    if (!user) {
      user = this.repositoryService.userRepository.create({
        email: userSchema.email.toLowerCase().trim(),
      });

      await this.repositoryService.userRepository.save(user);
    }

    return this.repositoryService.userRepository.save(user);
  }
}
