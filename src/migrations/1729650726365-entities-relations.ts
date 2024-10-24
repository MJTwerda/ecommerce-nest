import { MigrationInterface, QueryRunner } from "typeorm";

export class EntitiesRelations1729650726365 implements MigrationInterface {

    name = 'EntitiesRelations1729650726365';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "categories" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(50) NOT NULL,
                PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" character varying(50) NOT NULL,
                "name" character varying(50) NOT NULL,
                "password" character varying(20) NOT NULL,
                "address" text,
                "phone" text NOT NULL,
                "country" character varying(50),
                "city" character varying(50),
                PRIMARY KEY ("id"),
                UNIQUE ("email")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "orders" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "date" date,
                "user_id" uuid NOT NULL,
                "order_detail_id" uuid,
                PRIMARY KEY ("id"),
                FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
                UNIQUE ("order_detail_id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "order_details" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "price" decimal(10, 2) NOT NULL DEFAULT 0,
                "order_id" uuid,
                PRIMARY KEY ("id"),
                FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE,
                UNIQUE ("order_id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "products" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(50) NOT NULL,
                "description" text NOT NULL,
                "price" decimal(10, 2) NOT NULL DEFAULT 0,
                "stock" int NOT NULL DEFAULT 0,
                "image_url" text NOT NULL,
                "category_id" uuid,
                PRIMARY KEY ("id"),
                FOREIGN KEY ("category_id") REFERENCES "categories"("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "order_details_products_products" (
                "order_details_id" uuid NOT NULL,
                "products_id" uuid NOT NULL,
                PRIMARY KEY ("order_details_id", "products_id"),
                FOREIGN KEY ("order_details_id") REFERENCES "order_details"("id") ON DELETE CASCADE,
                FOREIGN KEY ("products_id") REFERENCES "products"("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "order_details_products_products"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "order_details"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
