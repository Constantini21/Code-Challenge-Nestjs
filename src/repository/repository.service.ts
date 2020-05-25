import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from '../database/entities/user.entityl';
import { Message } from '../database/entities/message.entity';
@Injectable()
export class RepositoryService {
  public userRepository(): Repository<User> {
    return new Repository<User>();
  }

  public messageRepository(): Repository<Message> {
    return new Repository<Message>();
  }
}
