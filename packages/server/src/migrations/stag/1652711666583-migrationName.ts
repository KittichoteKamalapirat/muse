import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationName1652711666583 implements MigrationInterface {
    name = 'migrationName1652711666583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "username" character varying NOT NULL,
                "email" character varying NOT NULL,
                "phonenumber" character varying NOT NULL,
                "isCreator" boolean NOT NULL DEFAULT false,
                "avatar" character varying NOT NULL,
                "about" character varying,
                "password" character varying NOT NULL,
                "followerNum" integer NOT NULL DEFAULT '0',
                "isAdmin" boolean NOT NULL DEFAULT false,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "paymentInfoId" integer,
                CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "UQ_c1756d987198666d8b02af03439" UNIQUE ("phonenumber"),
                CONSTRAINT "UQ_a7e858fb8abef2f0944a6d39b1d" UNIQUE ("about"),
                CONSTRAINT "REL_bb525f8673eb9b072f3a063adf" UNIQUE ("paymentInfoId"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "post" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "text" character varying,
                "instruction" text array,
                "advice" text array,
                "cooktime" character varying,
                "portion" integer,
                "points" integer NOT NULL DEFAULT '0',
                "isPublished" boolean NOT NULL DEFAULT true,
                "creatorId" uuid NOT NULL,
                "ingredients" jsonb NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id")
            )
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
            CREATE TABLE "mealkit" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "price" integer,
                "portion" integer NOT NULL,
                "items" text array,
                "deliveryFee" integer NOT NULL DEFAULT '0',
                "postId" integer NOT NULL,
                "creatorId" uuid NOT NULL,
                "reviewsSum" integer NOT NULL DEFAULT '0',
                "reviewsCounter" integer NOT NULL DEFAULT '0',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_118ea1c984f953411eb9d9d13a6" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "cart_item" (
                "id" SERIAL NOT NULL,
                "quantity" integer NOT NULL,
                "userId" uuid NOT NULL,
                "status" character varying NOT NULL DEFAULT 'UnOrdered',
                "mealkitId" integer NOT NULL,
                "orderId" integer,
                "trackingId" integer,
                "isReviewed" boolean NOT NULL DEFAULT false,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_bd94725aa84f8cf37632bcde997" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "cart_item_noti" (
                "id" SERIAL NOT NULL,
                "read" boolean NOT NULL DEFAULT false,
                "message" character varying NOT NULL,
                "avatarHref" character varying NOT NULL,
                "detailUrl" character varying NOT NULL,
                "userId" character varying NOT NULL,
                "cartItemId" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_9c52e7bfe6088fa5ea7396ba005" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "payment" (
                "id" SERIAL NOT NULL,
                "amount" integer NOT NULL,
                "qrUrl" character varying NOT NULL,
                "slipUrl" character varying,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "payment_info" (
                "id" SERIAL NOT NULL,
                "bankAccount" character varying NOT NULL,
                "bankCode" character varying NOT NULL,
                "userId" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_b2ba4f3b3f40c6a37e54fb8b252" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "order" (
                "id" SERIAL NOT NULL,
                "grossOrder" integer NOT NULL,
                "cartItemsByCreator" jsonb,
                "userId" uuid,
                "paymentId" integer,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "REL_9ad13532f48db4ac5a3b3dd70e" UNIQUE ("paymentId"),
                CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "follow" (
                "id" SERIAL NOT NULL,
                "userId" uuid NOT NULL,
                "followerId" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_fda88bc28a84d2d6d06e19df6e5" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tracking" (
                "id" SERIAL NOT NULL,
                "trackingNo" character varying NOT NULL,
                "isFound" boolean,
                "courier" character varying,
                "courierKey" character varying,
                "color" character varying,
                "status" character varying,
                "currentStatus" character varying,
                "shareLink" character varying,
                "timelines" jsonb,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_c6d380f3abe9852840e5aff1439" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "upvote" (
                "value" integer NOT NULL,
                "userId" uuid NOT NULL,
                "postId" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_802ac6b9099f86aa24eb22d9c05" PRIMARY KEY ("userId", "postId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "review" (
                "id" SERIAL NOT NULL,
                "title" character varying,
                "text" character varying,
                "score" integer NOT NULL,
                "images" text array,
                "userId" uuid NOT NULL,
                "mealkitId" integer NOT NULL,
                "cartItemId" integer,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id")
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
            CREATE TABLE "address" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "phonenumber" character varying NOT NULL,
                "line1" character varying,
                "line2" character varying,
                "subdistrict" character varying,
                "district" character varying,
                "province" character varying,
                "country" character varying,
                "postcode" character varying,
                "userId" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "REL_d25f1ea79e282cc8a42bd616aa" UNIQUE ("userId"),
                CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_bb525f8673eb9b072f3a063adfc" FOREIGN KEY ("paymentInfoId") REFERENCES "payment_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ADD CONSTRAINT "FK_15b13913f42a14ad0784a183e00" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "mealkit"
            ADD CONSTRAINT "FK_0b393eeaa23cfc4b57204069c4a" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
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
            ALTER TABLE "cart_item"
            ADD CONSTRAINT "FK_33d894493cf66fc7fa54f64153f" FOREIGN KEY ("trackingId") REFERENCES "tracking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti"
            ADD CONSTRAINT "FK_c3d62aa1c3401c0b03fee60c90a" FOREIGN KEY ("cartItemId") REFERENCES "cart_item"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_9ad13532f48db4ac5a3b3dd70e5" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "follow"
            ADD CONSTRAINT "FK_af9f90ce5e8f66f845ebbcc6f15" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "follow"
            ADD CONSTRAINT "FK_550dce89df9570f251b6af2665a" FOREIGN KEY ("followerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "upvote"
            ADD CONSTRAINT "FK_3abd9f37a94f8db3c33bda4fdae" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "upvote"
            ADD CONSTRAINT "FK_efc79eb8b81262456adfcb87de1" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION
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
            ALTER TABLE "video"
            ADD CONSTRAINT "FK_a38d033e82b1b0b0e6f7de67aad" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "image"
            ADD CONSTRAINT "FK_72da7f42d43f0be3b3ef35692a0" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "address"
            ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"
        `);
        await queryRunner.query(`
            ALTER TABLE "image" DROP CONSTRAINT "FK_72da7f42d43f0be3b3ef35692a0"
        `);
        await queryRunner.query(`
            ALTER TABLE "video" DROP CONSTRAINT "FK_a38d033e82b1b0b0e6f7de67aad"
        `);
        await queryRunner.query(`
            ALTER TABLE "review" DROP CONSTRAINT "FK_c31f613ad239223a717dec8cf3c"
        `);
        await queryRunner.query(`
            ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"
        `);
        await queryRunner.query(`
            ALTER TABLE "upvote" DROP CONSTRAINT "FK_efc79eb8b81262456adfcb87de1"
        `);
        await queryRunner.query(`
            ALTER TABLE "upvote" DROP CONSTRAINT "FK_3abd9f37a94f8db3c33bda4fdae"
        `);
        await queryRunner.query(`
            ALTER TABLE "follow" DROP CONSTRAINT "FK_550dce89df9570f251b6af2665a"
        `);
        await queryRunner.query(`
            ALTER TABLE "follow" DROP CONSTRAINT "FK_af9f90ce5e8f66f845ebbcc6f15"
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_9ad13532f48db4ac5a3b3dd70e5"
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item_noti" DROP CONSTRAINT "FK_c3d62aa1c3401c0b03fee60c90a"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item" DROP CONSTRAINT "FK_33d894493cf66fc7fa54f64153f"
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
            ALTER TABLE "mealkit" DROP CONSTRAINT "FK_0b393eeaa23cfc4b57204069c4a"
        `);
        await queryRunner.query(`
            ALTER TABLE "mealkit" DROP CONSTRAINT "FK_15b13913f42a14ad0784a183e00"
        `);
        await queryRunner.query(`
            ALTER TABLE "mealkit_file" DROP CONSTRAINT "FK_398128a089657db1b656212010b"
        `);
        await queryRunner.query(`
            ALTER TABLE "post" DROP CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_bb525f8673eb9b072f3a063adfc"
        `);
        await queryRunner.query(`
            DROP TABLE "address"
        `);
        await queryRunner.query(`
            DROP TABLE "image"
        `);
        await queryRunner.query(`
            DROP TABLE "video"
        `);
        await queryRunner.query(`
            DROP TABLE "review"
        `);
        await queryRunner.query(`
            DROP TABLE "upvote"
        `);
        await queryRunner.query(`
            DROP TABLE "tracking"
        `);
        await queryRunner.query(`
            DROP TABLE "follow"
        `);
        await queryRunner.query(`
            DROP TABLE "order"
        `);
        await queryRunner.query(`
            DROP TABLE "payment_info"
        `);
        await queryRunner.query(`
            DROP TABLE "payment"
        `);
        await queryRunner.query(`
            DROP TABLE "cart_item_noti"
        `);
        await queryRunner.query(`
            DROP TABLE "cart_item"
        `);
        await queryRunner.query(`
            DROP TABLE "mealkit"
        `);
        await queryRunner.query(`
            DROP TABLE "mealkit_file"
        `);
        await queryRunner.query(`
            DROP TABLE "post"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
