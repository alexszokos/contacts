import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const initialContacts = [
  {
    name: "Timothy Lewis",
    phoneNumber: "+36 01 234 5678",
    email: "timothy@mail.com",
    image: "/images/Timothy.png",
  },
  {
    name: "Sarah Wright",
    phoneNumber: "+36 01 234 5678",
    email: "sarah@mail.com",
    image: "/images/Sarah.png",
  },
  {
    name: "Lucy Jones",
    phoneNumber: "+36 01 234 5678",
    email: "lucy@mail.com",
    image: "/images/Lucy.png",
  },
  {
    name: "Jake Perez",
    phoneNumber: "+36 01 234 5678",
    email: "jake@mail.com",
    image: "/images/Jake.png",
  },
  {
    name: "Adebayo Rodriguez",
    phoneNumber: "+36 01 234 5678",
    email: "adebayo@mail.com",
    image: "/images/Adebayo.png",
  },
];

async function main() {
  console.log("Start seeding...");

  await prisma.contact.deleteMany();

  for (const c of initialContacts) {
    const contact = await prisma.contact.create({
      data: c,
    });
    console.log(`Created contact with id: ${contact.id}`);
  }

  console.log("Seeding finished.");
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
