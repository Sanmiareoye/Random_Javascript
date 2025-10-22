import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/users", async (req, res, next) => {
  const users = await prisma.user.findMany({
    where: { nationality: { in: ["Nigerian", "Brazilian", "Canadian"] } },
  });
  res.json(users);
});

app.put("/users", async (req, res, next) => {
  const updatedUser = await prisma.user.update({
    where: { email: "grace@example.com" },
    data: { age: 18, isMarried: true },
  });
  res.json(updatedUser);
});

app.delete("/users", async (req, res, next) => {
  const deletedUser = await prisma.user.deleteMany({
    where: { age: { gte: 30 } },
  });
  res.json(deletedUser);
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
