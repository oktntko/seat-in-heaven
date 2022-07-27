import { Floor, FloorType, Prisma } from "@prisma/client";
import ORM from "~/arch/ORM";
import dayjs from "~/libs/dayjs";
import { NotExistsError, UpdateConflictsError } from "~/middlewares/ErrorHandler";
import log from "~/middlewares/log";
import { CurrentUserType } from "~/types";

export type ParamFloor = Omit<
  Floor,
  "floor_id" | "created_at" | "created_by" | "updated_at" | "updated_by"
>;

const createFloor = async (
  currentUser: CurrentUserType,
  paramFloor: ParamFloor,
  ancestors: Prisma.Enumerable<Prisma.FloornodeCreateManyDescendantInput>
) => {
  log.debug("createFloor", currentUser);

  const floor = await ORM.floor.create({
    select: {
      floor_id: true,
      floorname: true,
      floortype: true,
      order: true,
      updated_at: true,
    },
    data: {
      floorname: paramFloor.floorname,
      floortype: paramFloor.floortype,
      order: paramFloor.order,
      created_by: currentUser.user_id,
      updated_by: currentUser.user_id,
      ancestors: {
        createMany: {
          data: ancestors,
        },
      },
    },
  });

  // createMany だと子孫IDに自分をセットできないため、フロアの登録ができてから自分自身のノードを登録する
  await ORM.floornode.create({
    data: {
      ancestor_id: floor.floor_id,
      descendant_id: floor.floor_id,
      distance: 0,
    },
  });

  return floor;
};

const updateFloor = async (currentUser: CurrentUserType, floor_id: number, floor: ParamFloor) => {
  log.debug("updateFloor", updateFloor);

  return ORM.floor.update({
    select: {
      floor_id: true,
      floorname: true,
      floortype: true,
      order: true,
      updated_at: true,
    },
    data: {
      floorname: floor.floorname,
      order: floor.order,
      updated_by: currentUser.user_id,
    },
    where: { floor_id },
  });
};

const patchFloor = async (
  currentUser: CurrentUserType,
  floor_id: number,
  floor: Partial<ParamFloor>
) => {
  log.debug("patchFloor", patchFloor);

  return ORM.floor.update({
    select: {
      floor_id: true,
      floorname: true,
      floortype: true,
      order: true,
      updated_at: true,
    },
    data: {
      floorname: floor.floorname,
      order: floor.order,
      updated_by: currentUser.user_id,
    },
    where: { floor_id },
  });
};

const deleteManyFloor = async (currentUser: CurrentUserType, floor_id_list: number[]) => {
  log.debug("deleteManyFloor", floor_id_list);

  return ORM.floor.deleteMany({
    where: {
      floor_id: {
        in: floor_id_list,
      },
    },
  });
};

const findUniqueFloor = async ({ floor_id }: RequireOne<Prisma.FloorWhereUniqueInput>) => {
  log.info("findUniqueFloor");

  return ORM.floor.findUnique({
    select: {
      floor_id: true,
      floorname: true,
      floortype: true,
      order: true,
      updated_at: true,
    },
    where: { floor_id },
  });
};

const findRootFloor = async () => {
  log.info("findRootFloor");

  return ORM.floor.findFirst({
    select: {
      floor_id: true,
      floorname: true,
      floortype: true,
      order: true,
      updated_at: true,
    },
    where: {
      floortype: FloorType.ROOT,
    },
  });
};

const findManyFloors = async (where: Prisma.FloorWhereInput) => {
  log.info("findManyFloors");

  return ORM.floor.findMany({
    select: {
      floor_id: true,
      floorname: true,
      floortype: true,
      order: true,
      updated_at: true,
      descendants: {
        select: {
          descendant: {
            select: {
              floor_id: true,
              floorname: true,
              floortype: true,
              order: true,
              updated_at: true,
            },
          },
        },
        where: {
          distance: 1,
        },
        orderBy: {
          descendant: {
            order: "asc",
          },
        },
      },
    },
    where,
  });
};

const checkPreviousVersion = async (
  where: RequireOne<Prisma.FloorWhereUniqueInput>,
  updated_at: string
) => {
  const previous = await findUniqueFloor(where);

  if (!previous) {
    throw new NotExistsError();
  } else if (!dayjs(previous.updated_at).isSame(updated_at)) {
    throw new UpdateConflictsError();
  }

  return previous;
};

export const FloorsRepository = {
  createFloor,
  updateFloor,
  patchFloor,
  deleteManyFloor,
  findUniqueFloor,
  findRootFloor,
  findManyFloors,
  checkPreviousVersion,
};
