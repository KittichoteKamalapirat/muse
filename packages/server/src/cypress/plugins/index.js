/* eslint-disable no-undef */
/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */

const typeorm = require("typeorm");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { CartItemStatus } = require("../../entities/CartItem");

const getConnectionOptions = (dropSchema) => ({
  name: Math.random().toString(), // has to be random everytime
  type: "postgres",
  entities: ["../dist/entities/*.js"],
  dropSchema,
  migrations: ["src/migrations/*.js"],
  logging: true,
  synchronize: true,
  // url: Cypress.env("dbUrl"),
  url: "postgresql://postgres:chain123@localhost:5432/cookknowdb_test",
});

// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  on("task", {
    async clearDbAndCreateAUserInDb() {
      const options = getConnectionOptions(true);
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash("3d2y", salt);

      typeorm.createConnection(options).then(async (connection) => {
        console.log({ connection });
        const uuid = uuidv4();

        const data = {
          username: "luffy",
          email: "luffy@gmail.com",
          phonenumber: "0900000000",
          password: hash,
          isCreator: true,
          avatar: `https://avatars.dicebear.com/api/open-peeps/${uuid}.svg`,
        };
        const userRepository = connection.getRepository("User");
        userRepository.save(data);

        await connection.close; // cypress wil throw error when rerun if connection is not close
      });

      return null;
    },

    async createPostAndMealkit() {
      const options = getConnectionOptions(false);
      console.log({ options });
      typeorm.createConnection(options).then(async (connection) => {
        const userRepository = connection.getRepository("User");
        const addressRepository = connection.getRepository("Address");
        const postRepository = connection.getRepository("Post");
        const mealkitRepository = connection.getRepository("Mealkit");

        userRepository.findOne({ username: "luffy" }).then((user) => {
          console.log("user is undefined?");
          console.log({ user });
          const addressData = {
            name: "Going Marry",
            phonenumber: "0900000000",
            line1: "Line1",
            line2: "Line2",
            subdistrict: "subdistrict",
            district: "district",
            province: "province",
            country: "country",
            postcode: "10101",
            userId: user.id,
          };
          const postData = {
            title: "Marinara",
            text: "Marinara Details",
            instruction: [""],
            cooktime: "1",
            portion: 1,
            advice: [""],
            videoUrl: "https://cookknow.s3.amazonaws.com/video1.mp4",
            thumbnailUrl: "https://cookknow.s3.amazonaws.com/thumbnail1.png",
            ingredients: [{ ingredient: "", amount: "", unit: "" }],
            creatorId: user.id,
          };

          addressRepository.save(addressData);

          postRepository.save(postData).then((post) => {
            const mealkitInput = {
              name: "Marinara Mealkit",
              items: [],
              images: ["https://cookknow.s3.amazonaws.com/thumbnail1.png"],
              price: 100,
              portion: 1,
              postId: post.id,
              creatorId: user.id,
            };

            mealkitRepository.save(mealkitInput);
          });
        });

        await connection.close; // cypress wil throw error when rerun if connection is not close
      });

      return null;
    },

    async buyerMakeAPayment() {
      const options = getConnectionOptions(false);
      console.log({ options });

      typeorm.createConnection(options).then(async (connection) => {
        const cartItemRepository = connection.getRepository("CartItem");

        cartItemRepository.update(
          { orderId: 1 },
          { status: CartItemStatus.ToDeliver }
        );
        await connection.close;
      });
      return null;
    },

    // add Tracking and update CartItem
    async creatorCreateTracking() {
      const connection = await typeorm.createConnection(
        getConnectionOptions(false)
      );

      const trackingRepository = connection.getRepository("Tracking");
      const cartItemRepository = connection.getRepository("CartItem");

      const trackingInput = {
        trackingNo: "SHD1063000874",
        courier: "xxx",
        courierKey: "xxx",
        color: "xxx",
        status: "xxx",
        currentStatus: "xxx",
        shareLink: "xxx",
        timelines: [],
      };
      const tracking = await trackingRepository.save(trackingInput);

      await cartItemRepository.update(
        { orderId: 1 },
        { status: CartItemStatus.OnTheWay, trackingId: tracking.id }
      );
      await connection.close;

      return tracking;
    },

    async adminCompleteCartItem() {
      const connection = await typeorm.createConnection(
        getConnectionOptions(false)
      );

      const cartItemRepository = connection.getRepository("CartItem");
      cartItemRepository.update(
        { orderId: 1 },
        { status: CartItemStatus.Complete }
      );
      return null;
    },
  });
};
