import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from "typeorm";
import { User } from '../entities/User';
import { Account } from '../entities/Account';

const port = process.env.DB_PORT as number | undefined;
const {  NODE_ENV } = process.env;

export const AppDataSource = new DataSource({
   type: 'postgres',
   host: process.env.DB_HOST,
   port: port,
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
  
   synchronize: NODE_ENV === "dev" ? false : false,
//logging logs sql command on the treminal
  logging: NODE_ENV === "dev" ? false : false,
  entities: [User, Account],
  migrations: [__dirname + "/migrations/*.ts"],
  subscribers: [],
})




/*
import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from "typeorm";
import { User } from '../entities/User';

const port = process.env.DB_PORT as number | undefined;
const {  NODE_ENV } = process.env;

export const AppDataSource = new DataSource({
   type: 'postgres',
   host: process.env.DB_HOST,
   port: port,
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
  
   synchronize: NODE_ENV === "dev" ? false : false,
//logging logs sql command on the treminal
  logging: NODE_ENV === "dev" ? false : false,
  entities: [User],
  migrations: [__dirname + "/migrations/*.ts"],
  subscribers: [],
})
*/

/*
"start": "ts-node src/index.ts",
    "typeorm": "typeorm-ts-node-commonjs",
    "migration": " npm run typeorm migration:run -- -d ./src/db/data-source.ts"

    typeorm migration:create ./migrations/users



    import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Users1704893363062 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'user',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'first_name',
                  type: 'varchar',
                },
                {
                  name: 'last_name',
                  type: 'varchar',
                },
                {
                  name: 'fullname',
                  type: 'varchar',
                },
                {
                  name: 'email',
                  type: 'varchar',
                  isUnique: true,
                },
                {
                  name: 'password',
                  type: 'varchar',
                },
                {
                  name: 'nationality',
                  type: 'varchar',
                  default: "'nigerian'", // Note: Use single quotes for default values in SQL
                },
                {
                  name: 'home_address',
                  type: 'varchar',
                },
                {
                  name: 'gender',
                  type: 'enum',
                  enum: ['male', 'female'],
                  default: "'male'",
                },
                {
                  name: 'date_of_birth',
                  type: 'date',
                },
                {
                  name: 'age',
                  type: 'int',
                },
                {
                  name: 'phone_number',
                  type: 'varchar',
                  default: "''", // Empty string as default value
                },
                {
                  name: 'role',
                  type: 'enum',
                  enum: ['admin', 'user'],
                  default: "'user'",
                },
                {
                  name: 'createdAt',
                  type: 'timestamp',
                  default: 'CURRENT_TIMESTAMP',
                },
                {
                  name: 'updatedAt',
                  type: 'timestamp',
                  default: 'CURRENT_TIMESTAMP',
                  onUpdate: 'CURRENT_TIMESTAMP',
                },
              ],
            }),
            true // Set `true` to execute the query immediately
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
    }

}

"start:dev": "concurrently \"tsc -w\" \"nodemon build/index.js\"",

*/