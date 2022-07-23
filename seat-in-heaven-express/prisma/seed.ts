import { FloorType, Prisma, PrismaClient, Role } from "@prisma/client";

const ORM = new PrismaClient({});

const users: Prisma.UserCreateManyInput[] = [
  {
    username: "admin",
    email: "admin@example.com",
    password: "admin@example.com",
    role: Role.SYSTEM_ADMIN,
    created_by: 0,
    updated_by: 0,
  },
  {
    username: "floor",
    email: "floor@example.com",
    password: "floor@example.com",
    role: Role.LIMITED_ADMIN,
    created_by: 0,
    updated_by: 0,
  },
  {
    username: "user",
    email: "user@example.com",
    password: "user@example.com",
    role: Role.USER,
    created_by: 0,
    updated_by: 0,
  },
];

const main = async () => {
  console.log(`Start seeding ...`);
  await ORM.user.createMany({
    skipDuplicates: true,
    data: users,
  });

  const rootCount = await ORM.floor.count({ where: { floortype: FloorType.ROOT } });

  if (rootCount === 0) {
    const root = await ORM.floor.create({
      data: {
        floortype: FloorType.ROOT,
        floorname: "root",
        order: 0,
        created_by: 0,
        updated_by: 0,
      },
    });

    await ORM.floornode.create({
      data: {
        ancestor_id: root.floor_id,
        descendant_id: root.floor_id,
        distance: 0,
      },
    });
  }

  console.log(`Seeding finished.`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await ORM.$disconnect();
  });
