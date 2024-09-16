import prisma from "../lib/prisma";
import { hash } from "bcrypt";

async function main() {
  await prisma.user.create({
    data: {
      firstName: "John",
      lastName: "Doe",
      email: "admin@nexteasy.fr",
      password: await hash("admin-password111!", 10),
      phone: "06 06 06 06 06",
      emailVerified: new Date(),
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
