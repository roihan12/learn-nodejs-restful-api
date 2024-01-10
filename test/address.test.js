import supertest from "supertest";
import {
  createTestAddress,
  createTestContact,
  createTestUser,
  getTestAddress,
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

describe("GET /api/contacts/:contactId/addresses/:addressId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can get address", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("Jl.test 1");
    expect(result.body.data.city).toBe("Bogor");
    expect(result.body.data.province).toBe("Jawa Barat");
    expect(result.body.data.country).toBe("Indonesia");
    expect(result.body.data.postal_code).toBe("123456");
  });

  it("should return 404 if address is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id}/addresses/${testAddress.id + 1}`)
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it("should return 404 if contact is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id + 1}/addresses/${testAddress.id}`)
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PUT /api/contacts/:contactId/addresses/:addressId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can update address", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .set("Authorization", "test")
      .send({
        street: "Jl.test 1 Update",
        city: "Bogor updated",
        province: "Jawa Barat",
        country: "Indonesia",
        postal_code: "234234",
      });

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testAddress.id);
    expect(result.body.data.street).toBe("Jl.test 1 Update");
    expect(result.body.data.city).toBe("Bogor updated");
    expect(result.body.data.province).toBe("Jawa Barat");
    expect(result.body.data.country).toBe("Indonesia");
    expect(result.body.data.postal_code).toBe("234234");
  });

  it("should reject if request is not valid", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .set("Authorization", "test")
      .send({
        street: "Jl.test 1 Update",
        city: "Bogor updated",
        province: "Jawa Barat",
        country: "",
        postal_code: "",
      });

    logger.info(result.body);
    expect(result.status).toBe(400);
  });

  it("should reject if address is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id + 1}`)
      .set("Authorization", "test")
      .send({
        street: "Jl.test 1 Update",
        city: "Bogor updated",
        province: "Jawa Barat",
        country: "Indonesia",
        postal_code: "12457",
      });

    logger.info(result.body);
    expect(result.status).toBe(404);
  });

  it("should reject if contact is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id + 1}/addresses/${testAddress.id}`)
      .set("Authorization", "test")
      .send({
        street: "Jl.test 1 Update",
        city: "Bogor updated",
        province: "Jawa Barat",
        country: "Indonesia",
        postal_code: "12457",
      });

    logger.info(result.body);
    expect(result.status).toBe(404);
  });
});

describe("DELETE /api/contacts/:contactId/addresses/:addressId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can remove address", async () => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testAddress = await getTestAddress();
    expect(testAddress).toBeNull();
  });

  it("should reject if address is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete(`/api/contacts/${testContact.id}/addresses/${testAddress.id + 1}`)
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(404);
  });

  it("should reject if contact is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete(`/api/contacts/${testContact.id + 1}/addresses/${testAddress.id}`)
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(404);
  });
});


describe("GET /api/contacts/:contactId/addresses/:addressId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can list address", async () => {
    const testContact = await getTestContact();
   
    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id}/addresses`)
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(1);

  });


  it("should return 404 if contact is not found", async () => {
    const testContact = await getTestContact();
    
    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id + 1}/addresses/`)
      .set("Authorization", "test");

    logger.info(result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});