import Fastify, { FastifyInstance } from "fastify";
import drizzlePlugin from "../../src/plugins/drizzle";

describe("Drizzle Plugin", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = Fastify();
    try {
      await app.register(drizzlePlugin);
    } catch (error) {
      console.error(error);
    }
  });

  beforeEach(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be registered as a plugin", async () => {
    expect(app.db).toBeDefined();
  });

  it("should have tests", () => {
    expect(true).toBe(true);
  });
});
