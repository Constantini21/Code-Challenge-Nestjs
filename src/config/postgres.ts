import { resolve } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const options: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'example',
  entities: [resolve(__dirname, '..', 'database', 'entities', '*')],
  migrations: [resolve(__dirname, '..', 'database', 'migrations', '*')],
  subscribers: [resolve(__dirname, '..', 'database', 'subscribers', '*')],
};

export default options;
