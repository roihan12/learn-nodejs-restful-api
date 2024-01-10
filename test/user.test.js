import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { createTestUser, getTestUser, removeTestUser } from "./test-util.js";
import bcrypt from "bcrypt";

describe("POST /api/users", function () {
  afterEach(async () => {
    await removeTestUser();
  });

  it("should can register new user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "test12",
      password: "test123",
      name: "test",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test12");
    expect(result.body.data.password).toBeUndefined();
    expect(result.body.data.name).toBe("test");
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

  it("should reject if username already resgitered", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "test12",
      password: "test123",
      name: "test",
    });
    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test12");
    expect(result.body.data.password).toBeUndefined();
    expect(result.body.data.name).toBe("test");

    result = await supertest(web).post("/api/users").send({
      username: "test12",
      password: "test123",
      name: "test",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("POST /api/users/login", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("shoud can login", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test12",
      password: "test123",
    });
    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe("test");
  });

  it("shoud reject login if request is invalid", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "",
      password: "",
    });
    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("shoud reject login if password is wrong", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test12",
      password: "test",
    });
    logger.info(result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it("shoud reject login if username is wrong", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "test123",
    });
    logger.info(result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/users/current", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("shoud can get current user", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "test");
    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test12");
    expect(result.body.data.name).toBe("test");
  });

  it("shoud reject if token invalid", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "salah");
    logger.info(result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PATCH /api/users/current", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("shoud can update user", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        name: "test updated",
        password: "test12345",
      });

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test12");
    expect(result.body.data.name).toBe("test updated");

    const user = await getTestUser();
    expect(await bcrypt.compare("test12345", user.password)).toBe(true);
  });

  it("shoud can update user name", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        name: "test updated",
      });

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test12");
    expect(result.body.data.name).toBe("test updated");
  });

  it("shoud can update user password", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        password: "test12345",
      });

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test12");
    expect(result.body.data.name).toBe("test");

    const user = await getTestUser();
    expect(await bcrypt.compare("test12345", user.password)).toBe(true);
  });

  it("shoud reject if request is not valid", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "salah")
      .send({
        password: "",
      });

    logger.info(result.body);
    expect(result.status).toBe(401);
  });
});

describe("DELETE /api/users/logout", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("shoud can logout", async () => {
    const result = await supertest(web)
      .delete("/api/users/logout")
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    const user = await getTestUser();
    expect(user.token).toBeNull();
  });

  it("shoud reject logout if token invalid", async () => {
    const result = await supertest(web)
      .delete("/api/users/logout")
      .set("Authorization", "salah");
    logger.info(result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});
