import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import postgresOptions from './config/postgres';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(postgresOptions),
    UserModule,
    MessageModule,
    GraphQLModule.forRoot({
      include: [UserModule, MessageModule],
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      playground: true,
    }),
  ],
})
export class AppModule {}
