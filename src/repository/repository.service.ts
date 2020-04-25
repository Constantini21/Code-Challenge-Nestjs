import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../database/entities/user';
import { Message } from '../database/entities/message';

@Injectable()
export class RepositoryService {
  public constructor(
    @InjectRepository(User) public readonly userRepository: Repository<User>,
    @InjectRepository(Message)
    public readonly messageRepository: Repository<Message>,
  ) {}
}
