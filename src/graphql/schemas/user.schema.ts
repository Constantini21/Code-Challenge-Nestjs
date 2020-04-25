import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserSchema {
  @Field()
  readonly email: string;
}
