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
import { MessageSchema, DeleteMessage } from '../schemas/message.schema';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly repositoryService: RepositoryService) {}

  @Mutation(() => Message)
  public async CreateMessage(
    @Args('data') input: MessageSchema,
  ): Promise<Message> {
    const message = this.repositoryService.messageRepository.create(input);

    return this.repositoryService.messageRepository.save(message);
  }

  @Mutation(() => Boolean)
  public async DeleteMessage(
    @Args('data') input: DeleteMessage,
  ): Promise<boolean> {
    const message = await this.repositoryService.messageRepository.findOne(
      input.id,
    );

    if (!message) {
      return false;
    }

    if (message.userId !== input.userId) {
      return false;
    }

    await this.repositoryService.messageRepository.delete(input.id);
    return true;
  }

  @Query(() => [Message])
  public async GetMessages(): Promise<Message[]> {
    return this.repositoryService.messageRepository.find();
  }

  @Query(() => [Message])
  public async GetMessagesFromUser(
    @Args('userId') userId: number,
  ): Promise<Message[]> {
    return this.repositoryService.messageRepository.find({
      where: { userId },
    });
  }

  @Query(() => Message, { nullable: true })
  public async GetMessage(@Args('id') id: number): Promise<Message> {
    return this.repositoryService.messageRepository.findOne(id);
  }

  @ResolveField(() => User)
  public async GetUser(@Parent() parent: Message): Promise<User> {
    return this.repositoryService.userRepository.findOne(parent.userId);
  }
}
