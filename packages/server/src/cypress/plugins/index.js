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
    async log(message) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash("3d2y", salt);

      console.log({ hash });
      typeorm
        .createConnection({
          name: "default",
          type: "postgres",
          entities: [
            // "dist/entities/*.js",
            // "dist/entities/**/*.js",
            // "src/entities/*.ts",
            // eslint-disable-next-line global-require
            "../dist/entities/*.js",
            // "**/*.entity{.ts,.js}",
            // "dist/**/*.entity{.ts,.js}",
            // "dist/src/**/*.entity{.ts,.js}",
            // "src/**/*.entity{.ts,.js}",
          ],
          dropSchema: true,
          migrations: ["src/migrations/*.js"],
          logging: false,
          synchronize: true,
          // url: Cypress.env("dbUrl"),
          url: "postgresql://postgres:chain123@localhost:5432/cookknowdb_test",
        })
        .then((connection) => {
          console.log("4");
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
          return userRepository
            .save(data)
            .then((savedPost) => {
              console.log("Post has been saved: ", savedPost);
              console.log("Now lets load all posts: ");

              const allUsers = userRepository.find();
              console.log({ allUsers });

              return userRepository.find();
            })
            .then((allPosts) => {
              console.log("All posts: ", allPosts);
            });
        });

      console.log(message);
      return null;
    },
  });
};
