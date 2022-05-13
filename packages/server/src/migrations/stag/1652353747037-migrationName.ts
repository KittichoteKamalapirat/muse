import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationName1652353747037 implements MigrationInterface {
    name = 'migrationName1652353747037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "video" DROP CONSTRAINT "FK_a38d033e82b1b0b0e6f7de67aad"
        `);
        await queryRunner.query(`
            ALTER TABLE "video" DROP COLUMN "uid"
        `);
        await queryRunner.query(`
            ALTER TABLE "video" DROP COLUMN "fileType"
        `);
        await queryRunner.query(`
            ALTER TABLE "video"
            ADD "fileType" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "video"
            ADD "uid" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti"
            ALTER COLUMN "avatarHref"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti"
            ALTER COLUMN "detailUrl"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "video"
            ADD CONSTRAINT "FK_a38d033e82b1b0b0e6f7de67aad" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "video" DROP CONSTRAINT "FK_a38d033e82b1b0b0e6f7de67aad"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti"
            ALTER COLUMN "detailUrl" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti"
            ALTER COLUMN "avatarHref" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "video" DROP COLUMN "uid"
        `);
        await queryRunner.query(`
            ALTER TABLE "video" DROP COLUMN "fileType"
        `);
        await queryRunner.query(`
            ALTER TABLE "video"
            ADD "fileType" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "video"
            ADD "uid" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "video"
            ADD CONSTRAINT "FK_a38d033e82b1b0b0e6f7de67aad" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

}
