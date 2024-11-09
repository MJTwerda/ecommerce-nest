import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameProductOrderDetailsTable1731123704215 implements MigrationInterface {

    name = 'RenameProductOrderDetailsTable1731123704215';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Eliminar la tabla de unión antigua
        await queryRunner.query(`
            DROP TABLE IF EXISTS "order_details_products_products"
        `);

        // Crear la nueva tabla de unión con el nombre correcto
        await queryRunner.query(`
            CREATE TABLE "order_details_products" (
                "order_details_id" uuid NOT NULL,
                "products_id" uuid NOT NULL,
                PRIMARY KEY ("order_details_id", "products_id"),
                FOREIGN KEY ("order_details_id") REFERENCES "order_details"("id") ON DELETE CASCADE,
                FOREIGN KEY ("products_id") REFERENCES "products"("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revertir el cambio eliminando la nueva tabla y restaurando la antigua
        await queryRunner.query(`
            DROP TABLE IF EXISTS "order_details_products"
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

}
