import { MigrationInterface, QueryRunner } from "typeorm";

export class createNewPost1649608243051 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(``);
    await queryRunner.query(`START TRANSACTION`);
    await queryRunner.query(
      `INSERT INTO "post"("title", "text", "instruction", "advice", "cooktime", "portion", "points", "thumbnailUrl", "videoUrl", "creatorId", "ingredients", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, DEFAULT, $7, $8, $9, $10, DEFAULT, DEFAULT) RETURNING "id", "points", "createdAt", "updatedAt" -- PARAMETERS: ["Marinara migration","Marinara migration Details",["boil pasta","make sauce","mix"],["tips"],"5",2,"https://cookknow.s3.amazonaws.com/cherry tomato.png","https://cookknow.s3.amazonaws.com/cherry tomato.mp4","e0930888-50c8-4172-9d80-9ba13cbe4d01","[{\"ingredient\":\"garlic\",\"amount\":\"10\",\"unit\":\"gram\"},{\"ingredient\":\"pasta\",\"amount\":\"20\",\"unit\":\"gram\"}]"]`
    );

    await queryRunner.query(`COMMIT`);

    await queryRunner.query(`START TRANSACTION`);
    await queryRunner.query(
      `INSERT INTO "mealkit"("name", "price", "portion", "items", "images", "postId", "creatorId", "deliveryFee", "reviewsSum", "reviewsCounter", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT) RETURNING "id", "deliveryFee", "reviewsSum", "reviewsCounter", "createdAt", "updatedAt" -- PARAMETERS: ["Marinara migration meal kit ",200,2,["garlic","pasta"],["https://cookknow.s3.amazonaws.com/maranara thumn.png"],3,"e0930888-50c8-4172-9d80-9ba13cbe4d01"]`
    );
    await queryRunner.query(`COMMIT`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
