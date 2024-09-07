import prisma from "../lib/db/prisma";
import { config } from "../config";
import { hash } from "bcrypt";

async function main() {
  const user = await prisma.user.create({
    data: {
      firstName: config.user.firstName,
      lastName: config.user.lastName,
      email: config.user.email,
      password: await hash(config.user.password, 10),
      phone: "06 06 06 06 06",
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
