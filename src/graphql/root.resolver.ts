import { UserResolver } from './resolvers/user.resolver';
import { MessageResolver } from './resolvers/message.resolver';

export const rootResolver = [UserResolver, MessageResolver];
