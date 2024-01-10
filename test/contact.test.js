import supertest from "supertest";
import { createTestUser, removeAllTestContacts, removeTestUser } from "./test-util.js";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/contacts", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can create new contact", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "test 1",
        last_name: "test 2",
        email: "test1@gmail.com",
        phone: "+6285423399446",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe("test 1");
    expect(result.body.data.last_name).toBe("test 2")
    expect(result.body.data.email).toBe("test1@gmail.com");
    expect(result.body.data.phone).toBe("+6285423399446");
  });


  it("should reject if request is not valid", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "",
        last_name: "test 2",
        email: "test1.com",
        phone: "+6285423399446789789048398399445454",
      });
    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
