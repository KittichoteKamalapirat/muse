import Redis from "ioredis";
import { describe, it } from "@jest/globals";

describe("redis tests", () => {
  it("ping", async () => {
    const redis = new Redis();
    await redis.ping();
  });
});
