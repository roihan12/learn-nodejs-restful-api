import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test12",
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test12",
      password: await bcrypt.hash("test123", 10),
      name: "test",
      token: "test",
    },
  });
};

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test12",
    },
  });
};

export const removeAllTestContacts = async () => {
  await prismaClient.contact.deleteMany({
    where: {
      username: "test12",
    },
  });
};

export const createTestContact = async () => {
  await prismaClient.contact.create({
    data: {
      username: "test12",
      first_name: "test",
      last_name: "test",
      email: "test@gmail.com",
      phone: "+6285423399467",
    },
  });
};

export const createManyTestContact = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.contact.createMany({
      data: {
        username: "test12",
        first_name: `test ${i}`,
        last_name: `test ${i}`,
        email: `test${i}@gmail.com`,
        phone: `+628542339946${i}`,
      },
    });
  }
};

export const getTestContact = async () => {
  return prismaClient.contact.findFirst({
    where: {
      username: "test12",
    },
  });
};

export const removeAllTestAddresses = async () => {
  await prismaClient.address.deleteMany({
    where: {
      contact: {
        username: "test12",
      },
    },
  });
};

export const createTestAddress = async () => {
  const contact = await getTestContact();

  await prismaClient.address.create({
    data: {
      contact_id: contact.id,
      street: "Jl.test 1",
      city: "Bogor",
      province: "Jawa Barat",
      country: "Indonesia",
      postal_code: "123456",
    },
  });
};

export const getTestAddress = async () => {
  return prismaClient.address.findFirst({
    where: {
      contact: {
        username: "test12",
      },
    },
  });
};
