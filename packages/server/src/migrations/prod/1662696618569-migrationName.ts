import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationName1662696618569 implements MigrationInterface {
    name = 'migrationName1662696618569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "isGuest" boolean NOT NULL DEFAULT false,
                "isMusician" boolean NOT NULL DEFAULT false,
                "username" character varying NOT NULL,
                "email" character varying NOT NULL,
                "avatar" character varying NOT NULL,
                "about" character varying,
                "password" character varying NOT NULL,
                "followerNum" integer NOT NULL DEFAULT '0',
                "isAdmin" boolean NOT NULL DEFAULT false,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "UQ_a7e858fb8abef2f0944a6d39b1d" UNIQUE ("about"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "post" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "text" character varying,
                "instruction" text array,
                "advice" text array,
                "cooktime" jsonb,
                "portion" integer,
                "points" integer NOT NULL DEFAULT '0',
                "isPublished" boolean NOT NULL DEFAULT true,
                "creatorId" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "upvote" (
                "value" integer NOT NULL,
                "userId" uuid NOT NULL,
                "songRequestId" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_373b7930c90b25bae539ff5ba00" PRIMARY KEY ("userId", "songRequestId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "song_request" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "counts" integer NOT NULL DEFAULT '0',
                "songId" uuid NOT NULL,
                "requesterId" uuid NOT NULL,
                "boxId" uuid,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_c2b53ff7f5fc5bf370a3f32ebf8" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "song" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "spotifyTrackId" character varying NOT NULL,
                "name" character varying NOT NULL,
                "albumName" character varying NOT NULL,
                "albumImageUrl" character varying NOT NULL,
                "artistName" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_baaa977f861cce6ff954ccee285" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "join_box" (
                "userId" uuid NOT NULL,
                "boxId" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_0e79f634a9414474087028e267d" PRIMARY KEY ("userId", "boxId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "box" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "type" character varying NOT NULL,
                "description" character varying,
                "creatorId" uuid NOT NULL,
                "addressId" uuid,
                "startTime" TIMESTAMP NOT NULL DEFAULT now(),
                "endTime" TIMESTAMP NOT NULL DEFAULT now(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_1a95bae3d12a9f21be6502e8a8b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "address" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "post"
            ADD CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "upvote"
            ADD CONSTRAINT "FK_3abd9f37a94f8db3c33bda4fdae" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "upvote"
            ADD CONSTRAINT "FK_d457449de03bd4efbb91f3df190" FOREIGN KEY ("songRequestId") REFERENCES "song_request"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "song_request"
            ADD CONSTRAINT "FK_4af173bdba31c1f42b5398add20" FOREIGN KEY ("songId") REFERENCES "song"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "song_request"
            ADD CONSTRAINT "FK_e707d4f885174c1475257113dfd" FOREIGN KEY ("requesterId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "song_request"
            ADD CONSTRAINT "FK_1105db54eaf3094a496de4e1852" FOREIGN KEY ("boxId") REFERENCES "box"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "join_box"
            ADD CONSTRAINT "FK_67ee05aef87d45d6eaa67d9b304" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "join_box"
            ADD CONSTRAINT "FK_6af4912efb59d22429d1c19b49d" FOREIGN KEY ("boxId") REFERENCES "box"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "box"
            ADD CONSTRAINT "FK_9288fae25bf350143238ec1b0b9" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "box"
            ADD CONSTRAINT "FK_14236ae97af5ea5b397608f7407" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "box" DROP CONSTRAINT "FK_14236ae97af5ea5b397608f7407"
        `);
        await queryRunner.query(`
            ALTER TABLE "box" DROP CONSTRAINT "FK_9288fae25bf350143238ec1b0b9"
        `);
        await queryRunner.query(`
            ALTER TABLE "join_box" DROP CONSTRAINT "FK_6af4912efb59d22429d1c19b49d"
        `);
        await queryRunner.query(`
            ALTER TABLE "join_box" DROP CONSTRAINT "FK_67ee05aef87d45d6eaa67d9b304"
        `);
        await queryRunner.query(`
            ALTER TABLE "song_request" DROP CONSTRAINT "FK_1105db54eaf3094a496de4e1852"
        `);
        await queryRunner.query(`
            ALTER TABLE "song_request" DROP CONSTRAINT "FK_e707d4f885174c1475257113dfd"
        `);
        await queryRunner.query(`
            ALTER TABLE "song_request" DROP CONSTRAINT "FK_4af173bdba31c1f42b5398add20"
        `);
        await queryRunner.query(`
            ALTER TABLE "upvote" DROP CONSTRAINT "FK_d457449de03bd4efbb91f3df190"
        `);
        await queryRunner.query(`
            ALTER TABLE "upvote" DROP CONSTRAINT "FK_3abd9f37a94f8db3c33bda4fdae"
        `);
        await queryRunner.query(`
            ALTER TABLE "post" DROP CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b"
        `);
        await queryRunner.query(`
            DROP TABLE "address"
        `);
        await queryRunner.query(`
            DROP TABLE "box"
        `);
        await queryRunner.query(`
            DROP TABLE "join_box"
        `);
        await queryRunner.query(`
            DROP TABLE "song"
        `);
        await queryRunner.query(`
            DROP TABLE "song_request"
        `);
        await queryRunner.query(`
            DROP TABLE "upvote"
        `);
        await queryRunner.query(`
            DROP TABLE "post"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
