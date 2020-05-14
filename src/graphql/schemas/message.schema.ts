import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MessageSchema {
  @Field()
  readonly content: string;

  @Field()
  readonly userId: number;
}

@InputType()
export class DeleteMessage {
  @Field()
  readonly id: number;

  @Field()
  readonly userId: number;
}
