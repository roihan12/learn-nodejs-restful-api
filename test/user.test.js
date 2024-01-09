import supertest from "supertest";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/users", function () {
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: "roihan12",
      },
    });
  });

  it("should can register new user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "roihan12",
      password: "test123",
      name: "Roihan Sori",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("roihan12");
    expect(result.body.data.password).toBeUndefined();
    expect(result.body.data.name).toBe("Roihan Sori");
  });

  it("should reject if request is invalid", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });
    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should rejectif username already resgitered", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "roihan12",
      password: "test123",
      name: "Roihan Sori",
    });
    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("roihan12");
    expect(result.body.data.password).toBeUndefined();
    expect(result.body.data.name).toBe("Roihan Sori");

    result = await supertest(web).post("/api/users").send({
      username: "roihan12",
      password: "test123",
      name: "Roihan Sori",
    });

    logger.info(result.body);
    
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
