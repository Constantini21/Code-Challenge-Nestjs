import { Injectable } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';

import { User } from '../database/entities/user.entityl';

import { Message } from '../database/entities/message.entity';
import { MessageInput, DeleteMessageInput } from './graphql/message.input';

@Injectable()
export class MessageService {
  constructor(private readonly repositoryService: RepositoryService) {}

  public async createMessage(args: MessageInput): Promise<Message> {
    const message = this.repositoryService.messageRepository.create({
      userId: args.userId,
      content: args.content,
    });

    await this.repositoryService.messageRepository.save(message);

    return message;
  }

  public async deleteMessage(args: DeleteMessageInput): Promise<boolean> {
    const message = await this.repositoryService.messageRepository.findOne(
      args.id,
    );

    if (!message) {
      return false;
    }

    if (message.userId !== args.userId) {
      return false;
    }

    await this.repositoryService.messageRepository.delete(args.id);
    return true;
  }

  public async getMessages(): Promise<Message[]> {
    const messages = await this.repositoryService.messageRepository.find();

    return messages;
  }

  public async getMessagesFromUser(id: number): Promise<Message[]> {
    const messages = await this.repositoryService.messageRepository.find({
      where: {
        userId: id,
      },
    });

    return messages;
  }

  public async getMessage(id: number): Promise<Message> {
    const message = await this.repositoryService.messageRepository.findOne(id);

    return message;
  }

  public async getUser(args: Message): Promise<User> {
    const user = this.repositoryService.userRepository.findOne(args.userId);

    return user;
  }
}
