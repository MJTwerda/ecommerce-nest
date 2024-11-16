import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePasswordColumnLength1731763080829 implements MigrationInterface {

    name: string = 'UpdatePasswordColumnLength1731763080829';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "password" TYPE VARCHAR(70)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "password" TYPE VARCHAR(20)
        `);
    }

}
