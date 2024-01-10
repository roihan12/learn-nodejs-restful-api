import supertest from "supertest";
import {
  createManyTestContact,
  createTestContact,
  createTestUser,
  getTestContact,
  removeAllTestAddresses,
  removeAllTestContacts,
  removeTestUser,
} from "./test-util.js";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/contacts/:contactId/addresses", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can create new address", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post(`/api/contacts/${testContact.id}/addresses`)
      .set("Authorization", "test")
      .send({
        street: "Jl.test 1",
        city: "Bogor",
        province: "Jawa Barat",
        country: "Indonesia",
        postal_code: "123456",
      });

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("Jl.test 1");
    expect(result.body.data.city).toBe("Bogor");
    expect(result.body.data.province).toBe("Jawa Barat");
    expect(result.body.data.country).toBe("Indonesia");
    expect(result.body.data.postal_code).toBe("123456");
  });

  it("should reject if request is not valid", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post(`/api/contacts/${testContact.id}/addresses`)
      .set("Authorization", "test")
      .send({
        street: "Jl.test 1",
        city: "Bogor",
        province: "Jawa Barat",
        country: "",
        postal_code: "",
      });

    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if contact is not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post(`/api/contacts/${testContact.id + 1}/addresses`)
      .set("Authorization", "test")
      .send({
        street: "Jl.test 1",
        city: "Bogor",
        province: "Jawa Barat",
        country: "",
        postal_code: "",
      });

    logger.info(result.body);
    expect(result.status).toBe(404);
  });
});
