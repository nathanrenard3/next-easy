import prisma from "../lib/prisma";
import { hash } from "bcrypt";

async function main() {
  const email = "admin@nexteasy.fr";
  const userData = {
    firstName: "John",
    lastName: "Doe",
    password: await hash("admin-password111!", 10),
    phone: "06 06 06 06 06",
    emailVerified: new Date(),
  };

  await prisma.user.upsert({
    where: { email },
    update: userData,
    create: { ...userData, email },
  });

  console.log(`User with email ${email} has been created or updated.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
