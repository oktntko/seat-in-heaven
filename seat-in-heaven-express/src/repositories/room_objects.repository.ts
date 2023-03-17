import { Prisma, RoomObject } from "@prisma/client";
import ORM from "~/arch/ORM";
import log from "~/middlewares/log";
import { CurrentUserType } from "~/types";

export type ParamObject = Omit<RoomObject, "object_id" | "floor_id">;

const updateManyRoomObjects = async (
  currentUser: CurrentUserType,
  floor_id: number,
  objects: Prisma.Enumerable<ParamObject>
) => {
  log.debug("updateManyRoomObjects", currentUser);

  return ORM.floor.update({
    data: {
      updated_at: new Date(),
      updated_by: currentUser.user_id,
      objects: {
        deleteMany: {
          floor_id,
        },
        createMany: {
          skipDuplicates: true,
          data: objects,
        },
      },
    },
    where: {
      floor_id,
    },
  });
};

const findUniqueRoomObject = async ({
  object_id,
}: RequireOne<Prisma.RoomObjectWhereUniqueInput>) => {
  log.info("findUniqueRoomObject");

  return ORM.roomObject.findUnique({
    select: {
      object_id: true,
      floor_id: true,
      objectname: true,
      objecttype: true,
      reservable: true,
      width: true,
      height: true,
      x: true,
      y: true,
    },
    where: { object_id },
  });
};

const deleteRoomObject = async ({ object_id }: RequireOne<Prisma.RoomObjectWhereUniqueInput>) => {
  log.info("deleteRoomObject");

  return ORM.roomObject.delete({
    select: {
      object_id: true,
      floor_id: true,
      objectname: true,
      objecttype: true,
      reservable: true,
      width: true,
      height: true,
      x: true,
      y: true,
    },
    where: { object_id },
  });
};

export const RoomObjectsRepository = {
  updateManyRoomObjects,
  findUniqueRoomObject,
  deleteRoomObject,
};
