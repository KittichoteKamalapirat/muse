import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationName1652289654827 implements MigrationInterface {
    name = 'migrationName1652289654827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"
        `);
        await queryRunner.query(`
            ALTER TABLE "post" DROP CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b"
        `);
        await queryRunner.query(`
            ALTER TABLE "mealkit" DROP CONSTRAINT "FK_0b393eeaa23cfc4b57204069c4a"
        `);
        await queryRunner.query(`
            CREATE TABLE "mealkit_file" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "fileType" character varying NOT NULL,
                "url" character varying NOT NULL,
                "mealkitId" integer,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_f8cdbe58ebc68833f8f7e17e4f0" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "video" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "fileType" character varying,
                "url" character varying NOT NULL,
                "postId" integer,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "REL_a38d033e82b1b0b0e6f7de67aa" UNIQUE ("postId"),
                CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "image" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "fileType" character varying,
                "url" character varying NOT NULL,
                "postId" integer,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "REL_72da7f42d43f0be3b3ef35692a" UNIQUE ("postId"),
                CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "post" DROP COLUMN "thumbnailUrl"
        `);
        await queryRunner.query(`
            ALTER TABLE "post" DROP COLUMN "videoUrl"
        `);
        await queryRunner.query(`
            ALTER TABLE "mealkit" DROP COLUMN "images"
        `);
        await queryRunner.query(`
            ALTER TABLE "video" DROP COLUMN "fileType"
        `);
        await queryRunner.query(`
            ALTER TABLE "post"
            ADD "isPublished" boolean NOT NULL DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti"
            ADD "avatarHref" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti"
            ADD "detailUrl" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tracking"
            ADD "isFound" boolean
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
            ALTER TABLE "ingredient" DROP COLUMN "amount"
        `);
        await queryRunner.query(`
            ALTER TABLE "ingredient"
            ADD "amount" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "post"
            ALTER COLUMN "title"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "post"
            ALTER COLUMN "ingredients"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti" DROP CONSTRAINT "FK_c3d62aa1c3401c0b03fee60c90a"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti" DROP CONSTRAINT "REL_c3d62aa1c3401c0b03fee60c90"
        `);
        await queryRunner.query(`
            ALTER TABLE "tracking"
            ALTER COLUMN "courier" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tracking"
            ALTER COLUMN "courierKey" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tracking"
            ALTER COLUMN "color" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tracking"
            ALTER COLUMN "status" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tracking"
            ALTER COLUMN "currentStatus" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tracking"
            ALTER COLUMN "shareLink" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "address"
            ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "post"
            ADD CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "mealkit_file"
            ADD CONSTRAINT "FK_398128a089657db1b656212010b" FOREIGN KEY ("mealkitId") REFERENCES "mealkit"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "mealkit"
            ADD CONSTRAINT "FK_0b393eeaa23cfc4b57204069c4a" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti"
            ADD CONSTRAINT "FK_c3d62aa1c3401c0b03fee60c90a" FOREIGN KEY ("cartItemId") REFERENCES "cart_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "video"
            ADD CONSTRAINT "FK_a38d033e82b1b0b0e6f7de67aad" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "image"
            ADD CONSTRAINT "FK_72da7f42d43f0be3b3ef35692a0" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "image" DROP CONSTRAINT "FK_72da7f42d43f0be3b3ef35692a0"
        `);
        await queryRunner.query(`
            ALTER TABLE "video" DROP CONSTRAINT "FK_a38d033e82b1b0b0e6f7de67aad"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti" DROP CONSTRAINT "FK_c3d62aa1c3401c0b03fee60c90a"
        `);
        await queryRunner.query(`
            ALTER TABLE "mealkit" DROP CONSTRAINT "FK_0b393eeaa23cfc4b57204069c4a"
        `);
        await queryRunner.query(`
            ALTER TABLE "mealkit_file" DROP CONSTRAINT "FK_398128a089657db1b656212010b"
        `);
        await queryRunner.query(`
            ALTER TABLE "post" DROP CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b"
        `);
        await queryRunner.query(`
            ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"
        `);
        await queryRunner.query(`
            ALTER TABLE "tracking"
            ALTER COLUMN "shareLink"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tracking"
            ALTER COLUMN "currentStatus"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tracking"
            ALTER COLUMN "status"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tracking"
            ALTER COLUMN "color"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tracking"
            ALTER COLUMN "courierKey"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tracking"
            ALTER COLUMN "courier"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti"
            ADD CONSTRAINT "REL_c3d62aa1c3401c0b03fee60c90" UNIQUE ("cartItemId")
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti"
            ADD CONSTRAINT "FK_c3d62aa1c3401c0b03fee60c90a" FOREIGN KEY ("cartItemId") REFERENCES "cart_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "post"
            ALTER COLUMN "ingredients" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "post"
            ALTER COLUMN "title" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "ingredient" DROP COLUMN "amount"
        `);
        await queryRunner.query(`
            ALTER TABLE "ingredient"
            ADD "amount" integer NOT NULL
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
            ALTER TABLE "tracking" DROP COLUMN "isFound"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti" DROP COLUMN "detailUrl"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti" DROP COLUMN "avatarHref"
        `);
        await queryRunner.query(`
            ALTER TABLE "post" DROP COLUMN "isPublished"
        `);
        await queryRunner.query(`
            ALTER TABLE "video"
            ADD "fileType" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "mealkit"
            ADD "images" text array
        `);
        await queryRunner.query(`
            ALTER TABLE "post"
            ADD "videoUrl" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "post"
            ADD "thumbnailUrl" character varying
        `);
        await queryRunner.query(`
            DROP TABLE "image"
        `);
        await queryRunner.query(`
            DROP TABLE "video"
        `);
        await queryRunner.query(`
            DROP TABLE "mealkit_file"
        `);
        await queryRunner.query(`
            ALTER TABLE "mealkit"
            ADD CONSTRAINT "FK_0b393eeaa23cfc4b57204069c4a" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "post"
            ADD CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "address"
            ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
