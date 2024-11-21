import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddAdminColumnToUser1732216907699 implements MigrationInterface {

    name: string = 'AddAdminColumnToUser1732216907699';
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("users", new TableColumn({
            name: "is_admin",
            type: "boolean",
            default: false,
            isNullable: false,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "is_admin");
    }

}
