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

export const removeAllTestContacts= async () => {
  await prismaClient.contact.deleteMany({
    where: {
      username: "test12",
    },
  });
};

export const createTestContact= async () => {
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

export const getTestContact = async () => {
  return prismaClient.contact.findFirst({
    where: {
      username: "test12"
    }
  })

}