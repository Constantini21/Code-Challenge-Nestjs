import {
  Args,
  Parent,
  Query,
  Resolver,
  ResolveField,
  Mutation,
} from '@nestjs/graphql';

import { RepositoryService } from '../../repository/repository.service';
import { User } from '../../database/entities/user';
import { Message } from '../../database/entities/message';
import { MessageSchema } from '../schemas/message.schema';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly repositoryService: RepositoryService) {}

  @Mutation(() => Message)
  public async createMessage(
    @Args('data') input: MessageSchema,
  ): Promise<Message> {
    const message = this.repositoryService.messageRepository.create(input);

    return this.repositoryService.messageRepository.save(message);
  }

  @Query(() => [Message])
  public async getMessages(): Promise<Message[]> {
    return this.repositoryService.messageRepository.find();
  }

  @Query(() => [Message])
  public async getMessagesFromUser(
    @Args('userId') userId: number,
  ): Promise<Message[]> {
    return this.repositoryService.messageRepository.find({
      where: { userId },
    });
  }

  @Query(() => Message, { nullable: true })
  public async getMessage(@Args('id') id: number): Promise<Message> {
    return this.repositoryService.messageRepository.findOne(id);
  }

  @ResolveField(() => User)
  public async getUser(@Parent() parent: Message): Promise<User> {
    return this.repositoryService.userRepository.findOne(parent.userId);
  }
}
