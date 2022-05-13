import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationName1652351657090 implements MigrationInterface {
    name = 'migrationName1652351657090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart_item" DROP CONSTRAINT "FK_158f0325ccf7f68a5b395fa2f6a"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item" DROP CONSTRAINT "FK_9c266e5b70cc40392e53069002b"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item" DROP CONSTRAINT "FK_26a8ff17b49cc3b5dcbdd7d357a"
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"
        `);
        await queryRunner.query(`
            ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"
        `);
        await queryRunner.query(`
            ALTER TABLE "review" DROP CONSTRAINT "FK_c31f613ad239223a717dec8cf3c"
        `);
        await queryRunner.query(`
            ALTER TABLE "image" DROP CONSTRAINT "FK_72da7f42d43f0be3b3ef35692a0"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti" DROP CONSTRAINT "FK_c3d62aa1c3401c0b03fee60c90a"
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
            ALTER TABLE "user" DROP CONSTRAINT "UQ_b613f025993be2d1e51ba4c2b5f"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti" DROP COLUMN "avatarHref"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti"
            ADD "avatarHref" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti" DROP COLUMN "detailUrl"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti"
            ADD "detailUrl" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item"
            ADD CONSTRAINT "FK_158f0325ccf7f68a5b395fa2f6a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item"
            ADD CONSTRAINT "FK_9c266e5b70cc40392e53069002b" FOREIGN KEY ("mealkitId") REFERENCES "mealkit"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item"
            ADD CONSTRAINT "FK_26a8ff17b49cc3b5dcbdd7d357a" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "review"
            ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "review"
            ADD CONSTRAINT "FK_c31f613ad239223a717dec8cf3c" FOREIGN KEY ("mealkitId") REFERENCES "mealkit"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "image"
            ADD CONSTRAINT "FK_72da7f42d43f0be3b3ef35692a0" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti"
            ADD CONSTRAINT "FK_c3d62aa1c3401c0b03fee60c90a" FOREIGN KEY ("cartItemId") REFERENCES "cart_item"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti" DROP CONSTRAINT "FK_c3d62aa1c3401c0b03fee60c90a"
        `);
        await queryRunner.query(`
            ALTER TABLE "image" DROP CONSTRAINT "FK_72da7f42d43f0be3b3ef35692a0"
        `);
        await queryRunner.query(`
            ALTER TABLE "review" DROP CONSTRAINT "FK_c31f613ad239223a717dec8cf3c"
        `);
        await queryRunner.query(`
            ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item" DROP CONSTRAINT "FK_26a8ff17b49cc3b5dcbdd7d357a"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item" DROP CONSTRAINT "FK_9c266e5b70cc40392e53069002b"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item" DROP CONSTRAINT "FK_158f0325ccf7f68a5b395fa2f6a"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti" DROP COLUMN "detailUrl"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti"
            ADD "detailUrl" character
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti" DROP COLUMN "avatarHref"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti"
            ADD "avatarHref" character
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_b613f025993be2d1e51ba4c2b5f" UNIQUE ("avatar")
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
            ADD CONSTRAINT "FK_c3d62aa1c3401c0b03fee60c90a" FOREIGN KEY ("cartItemId") REFERENCES "cart_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "image"
            ADD CONSTRAINT "FK_72da7f42d43f0be3b3ef35692a0" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "review"
            ADD CONSTRAINT "FK_c31f613ad239223a717dec8cf3c" FOREIGN KEY ("mealkitId") REFERENCES "mealkit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "review"
            ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item"
            ADD CONSTRAINT "FK_26a8ff17b49cc3b5dcbdd7d357a" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item"
            ADD CONSTRAINT "FK_9c266e5b70cc40392e53069002b" FOREIGN KEY ("mealkitId") REFERENCES "mealkit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item"
            ADD CONSTRAINT "FK_158f0325ccf7f68a5b395fa2f6a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
