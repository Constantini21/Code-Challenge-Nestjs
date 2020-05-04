import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import { RepositoryModule } from './repository/repository.module';
import postgresOptions from './configs/postgres';
import { rootResolver } from './graphql/root.resolver';

@Module({
  imports: [
    TypeOrmModule.forRoot(postgresOptions),
    RepositoryModule,
    ...rootResolver,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
  ],
})
export class AppModule {}
