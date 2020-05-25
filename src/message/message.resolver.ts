import {
  Args,
  Parent,
  Query,
  Resolver,
  ResolveField,
  Mutation,
  Subscription,
} from '@nestjs/graphql';

import { PubSub } from 'graphql-subscriptions';
import { MessageService } from './message.service';

import { User } from '../database/entities/user.entityl';
import { Message } from '../database/entities/message.entity';
import { MessageInput, DeleteMessageInput } from './graphql/message.input';

const pubSub = new PubSub();

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Query(() => [Message])
  public async getMessages(): Promise<Message[]> {
    return this.messageService.getMessages();
  }

  @Query(() => [Message])
  public async getMessagesFromUser(
    @Args('userId') userId: number,
  ): Promise<Message[]> {
    return this.messageService.getMessagesFromUser(userId);
  }

  @Query(() => Message, { nullable: true })
  public async getMessage(@Args('id') id: number): Promise<Message> {
    return this.messageService.getMessage(id);
  }

  @Mutation(() => Message)
  public async createMessage(
    @Args('args') args: MessageInput,
  ): Promise<Message> {
    const message = await this.messageService.createMessage(args);

    await pubSub.publish('messageAdded', {
      messageAdded: message,
    });

    return message;
  }

  @Mutation(() => Boolean)
  public async deleteMessage(
    @Args('args') args: DeleteMessageInput,
  ): Promise<boolean> {
    return this.messageService.deleteMessage(args);
  }

  @Subscription(() => Message)
  messageAdded(): any {
    return pubSub.asyncIterator('messageAdded');
  }

  @ResolveField(() => User, { name: 'user' })
  public async getUser(@Parent() args: Message): Promise<User> {
    return this.messageService.getUser(args);
  }
}
