import { FloorType } from "@prisma/client";
import { RoomsQuery } from "~/controllers/api/rooms.controller";
import log from "~/middlewares/log";
import { FloorsRepository } from "~/repositories/floors.repository";

// # GET /api/rooms
const getRooms = async (query: RoomsQuery) => {
  log.debug("getRooms", query);

  const floors = await FloorsRepository.findManyRooms({
    floorname: {
      contains: query.keyword,
    },
  });

  const rooms = Array.from(
    floors
      .flatMap((floor) => floor.descendants)
      .map(({ descendant }) => descendant)
      .reduce(
        (map, room) => {
          map.set(room.floor_id, {
            ...room,
            ancestors: room.ancestors.map((node) => node.ancestor),
          });

          return map;
        },
        new Map<
          number,
          {
            floor_id: number;
            updated_at: Date;
            floortype: FloorType;
            floorname: string;
            order: number;
            ancestors: {
              floor_id: number;
              updated_at: Date;
              floortype: FloorType;
              floorname: string;
              order: number;
            }[];
          }
        >()
      )
      .values()
  );

  return {
    rooms,
  };
};

export const RoomsService = {
  getRooms,
};
