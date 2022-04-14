/* eslint-disable no-undef */
/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
const typeorm = require("typeorm");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  on("task", {
    async createAUserInDb() {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash("3d2y", salt);

      typeorm
        .createConnection({
          name: Math.random().toString(),
          type: "postgres",
          entities: ["../dist/entities/*.js"],
          dropSchema: true,
          migrations: ["src/migrations/*.js"],
          logging: false,
          synchronize: true,
          // url: Cypress.env("dbUrl"),
          url: "postgresql://postgres:chain123@localhost:5432/cookknowdb_test",
        })
        .then(async (connection) => {
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
          userRepository
            .save(data)
            .then((savedPost) => {
              console.log("Post has been savedd: ", savedPost);

              const allUsers = userRepository.find();
              console.log({ allUsers });

              return userRepository.find();
            })
            .then((allPosts) => {
              console.log("All posts: ", allPosts);
            });

          console.log({ connection });
          console.log("url", connection.options.url);

          await connection.close; // cypress wil throw error when rerun if connection is not close

          console.log("connection closed");
        });

      return null;
    },
  });
};
