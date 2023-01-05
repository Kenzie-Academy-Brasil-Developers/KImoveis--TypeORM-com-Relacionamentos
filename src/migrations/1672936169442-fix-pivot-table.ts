import { MigrationInterface, QueryRunner } from "typeorm";

export class fixPivotTable1672936169442 implements MigrationInterface {
    name = 'fixPivotTable1672936169442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_properties" DROP CONSTRAINT "FK_fb7d2ab99dbc643ea041a3cd6f9"`);
        await queryRunner.query(`ALTER TABLE "users_properties" RENAME COLUMN "usersId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "users_properties" ADD CONSTRAINT "FK_d7b5768c09cf264992b26cd8c90" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_properties" DROP CONSTRAINT "FK_d7b5768c09cf264992b26cd8c90"`);
        await queryRunner.query(`ALTER TABLE "users_properties" RENAME COLUMN "userId" TO "usersId"`);
        await queryRunner.query(`ALTER TABLE "users_properties" ADD CONSTRAINT "FK_fb7d2ab99dbc643ea041a3cd6f9" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
