/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  roots: ["./src"], //don't run in dist
  testPathIgnorePatterns: [".d.ts", ".js"], //actually may not need this since /src has no js anyway
  preset: "ts-jest",
  testEnvironment: "node",
};
