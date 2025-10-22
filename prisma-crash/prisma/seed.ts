import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  await prisma.user.createMany({
    data: [
      {
        name: "Grace",
        email: "grace@example.com",
        age: 28,
        isMarried: false,
        nationality: "Nigerian",
      },
      {
        name: "Ruka",
        email: "ruka@example.com",
        age: 32,
        isMarried: true,
        nationality: "Japanese",
      },
      {
        name: "Daniel",
        email: "daniel@example.com",
        age: 25,
        isMarried: false,
        nationality: "Canadian",
      },
      {
        name: "Amira",
        email: "amira@example.com",
        age: 29,
        isMarried: true,
        nationality: "Egyptian",
      },
      {
        name: "Mateo",
        email: "mateo@example.com",
        age: 34,
        isMarried: false,
        nationality: "Spanish",
      },
      {
        name: "Sophia",
        email: "sophia@example.com",
        age: 30,
        isMarried: true,
        nationality: "Brazilian",
      },
      {
        name: "Liam",
        email: "liam@example.com",
        age: 27,
        isMarried: false,
        nationality: "Irish",
      },
      {
        name: "Hana",
        email: "hana@example.com",
        age: 31,
        isMarried: true,
        nationality: "Korean",
      },
    ],
  });
}

seed().then(() => prisma.$disconnect());
