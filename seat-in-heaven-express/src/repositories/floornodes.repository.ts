import { Prisma } from "@prisma/client";
import ORM from "~/arch/ORM";
import log from "~/middlewares/log";

const findAncestors = async (where: Prisma.FloornodeWhereInput) => {
  log.info("findAncestors", where);

  return ORM.floornode.findMany({
    select: {
      distance: true,
      ancestor_id: true,
      ancestor: {
        select: {
          floor_id: true,
          floorname: true,
          floortype: true,
          order: true,
          updated_at: true,
          updated_by: true,
        },
      },
    },
    where,
    orderBy: {
      distance: "desc",
    },
  });
};

const findDescendants = async (where: Prisma.FloornodeWhereInput) => {
  log.info("findDescendants", where);

  return ORM.floornode.findMany({
    select: {
      distance: true,
      descendant_id: true,
      descendant: {
        select: {
          floor_id: true,
          floorname: true,
          floortype: true,
          order: true,
          updated_at: true,
          updated_by: true,
        },
      },
    },
    where,
    orderBy: {
      descendant: {
        order: "asc",
      },
    },
  });
};

const deleteMany = async (where: Prisma.FloornodeWhereInput) => {
  log.info("deleteMany", where);

  return ORM.floornode.deleteMany({
    where,
  });
};

const createMany = async (data: Prisma.FloornodeCreateManyInput[]) => {
  log.info("createMany", data);

  return ORM.floornode.createMany({
    data,
  });
};

export const FloornodesRepository = {
  findAncestors,
  findDescendants,
  deleteMany,
  createMany,
};
