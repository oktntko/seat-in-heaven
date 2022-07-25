import { FloorType, Prisma } from "@prisma/client";
import { FloorsQuery } from "~/controllers/api/floors.controller";
import { NotExistsError } from "~/middlewares/ErrorHandler";
import log from "~/middlewares/log";
import { FloorsRepository, ParamFloor } from "~/repositories/floors.repository";
import { CurrentUserType } from "~/types";

// # POST /api/floors
const postFloor = async (
  currentUser: CurrentUserType,
  floor: Omit<ParamFloor, "order">,
  parent_id: number
) => {
  log.debug("postFloor", floor);

  // 親を取得する
  const parent = await FloorsRepository.findFirstFloorWithChildren({
    floor_id: parent_id,
  });
  if (!parent) {
    throw new NotExistsError();
  }

  // 祖先を取得する
  const ancestors = await FloorsRepository.findAncestors(parent_id);
  // 祖先の距離は親から祖先の距離＋１してノードを登録する
  const myAncestors: Prisma.FloornodeCreateManyDescendantInput[] = [
    ...ancestors.map((ancestor) => {
      return {
        ancestor_id: ancestor.ancestor_id,
        distance: ancestor.distance + 1,
      };
    }),
  ];

  return FloorsRepository.createFloor(
    currentUser,
    {
      floortype: floor.floortype,
      floorname: floor.floorname,
      order: parent.descendants.length + 1,
    },
    myAncestors
  );
};

// # GET /api/floors
const getFloors = async (query: FloorsQuery) => {
  log.debug("getFloors", query);

  const where = {};
  if (query.floor_id) {
    Object.assign(where, {
      floor_id: query.floor_id,
    });
  } else {
    Object.assign(where, {
      floortype: FloorType.ROOT,
    });
  }

  log.debug("where", where);

  const floor = await FloorsRepository.findFirstFloorWithChildren(where);
  if (!floor) {
    throw new NotExistsError();
  }

  // 祖先を取得する
  const ancestors = await FloorsRepository.findAncestors(floor.floor_id);

  return {
    floor_id: floor.floor_id,
    updated_at: floor.updated_at,
    floortype: floor.floortype,
    floorname: floor.floorname,
    order: floor.order,
    ancestors: ancestors
      .filter((node) => node.ancestor.floortype !== FloorType.ROOT)
      .map((node) => {
        return {
          floor_id: node.ancestor.floor_id,
          updated_at: node.ancestor.updated_at,
          floortype: node.ancestor.floortype,
          floorname: node.ancestor.floorname,
          order: node.ancestor.order,
        };
      }),
    children: floor.descendants.map((node) => {
      return {
        floor_id: node.descendant.floor_id,
        updated_at: node.descendant.updated_at,
        floortype: node.descendant.floortype,
        floorname: node.descendant.floorname,
        order: node.descendant.order,
      };
    }),
  };
};

// # PUT /api/floors/:floor_id
const putFloor = async (
  currentUser: CurrentUserType,
  floor_id: number,
  floor: Omit<ParamFloor, "order">,
  updated_at: string
) => {
  log.debug("putFloor", floor);

  await FloorsRepository.checkPreviousVersion({ floor_id }, updated_at);

  return FloorsRepository.patchFloor(currentUser, floor_id, floor);
};

// # GET /api/floors/:floor_id
const getFloor = async (currentUser: CurrentUserType, floor_id?: number) => {
  log.debug("getFloor", floor_id);

  const floor = await FloorsRepository.findUniqueFloor({ floor_id });
  if (!floor) {
    throw new NotExistsError();
  }

  return floor;
};

// # DELETE /api/floors/:floor_id
const deleteFloor = async (currentUser: CurrentUserType, floor_id: number, updated_at: string) => {
  log.debug("deleteFloor", floor_id);

  await FloorsRepository.checkPreviousVersion({ floor_id }, updated_at);

  return FloorsRepository.deleteFloor(currentUser, floor_id);
};

export const FloorsService = {
  postFloor,
  getFloors,
  putFloor,
  getFloor,
  deleteFloor,
};
