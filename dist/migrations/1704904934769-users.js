"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users1704904934769 = void 0;
const typeorm_1 = require("typeorm");
class Users1704904934769 {
    constructor() {
        this.name = 'Users1704904934769';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }), true // Set `true` to execute the query immediately
        );
    }
    async down(queryRunner) {
        await queryRunner.dropTable('user');
    }
}
exports.Users1704904934769 = Users1704904934769;
