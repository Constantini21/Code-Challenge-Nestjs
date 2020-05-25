import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class UserInput {
  @Field()
  @IsEmail()
  readonly email: string;
}
