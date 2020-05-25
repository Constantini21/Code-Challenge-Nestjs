import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';

@InputType()
export class MessageInput {
  @Field()
  @IsString()
  readonly content: string;

  @Field()
  @IsNumber()
  readonly userId: number;
}

@InputType()
export class DeleteMessageInput {
  @Field()
  @IsNumber()
  readonly id: number;

  @Field()
  @IsNumber()
  readonly userId: number;
}
