import { Prisma } from "@prisma/client";
import { FloorsNodeBody } from "~/controllers/api/floors.controller";
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
  const parent = await FloorsRepository.findUniqueFloorWithChildren({
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
const getFloors = async (floor_id?: number) => {
  log.debug("getFloors", floor_id);

  if (!floor_id) {
    const floor = await FloorsRepository.findRootFloor();
    if (!floor) {
      throw new NotExistsError();
    }
    floor_id = floor.floor_id;
  }

  const root = await FloorsRepository.findUniqueFloorWithChildren({ floor_id });
  if (!root) {
    throw new NotExistsError();
  }

  const children = root.descendants.map((rootnode) => {
    return {
      floor_id: rootnode.descendant.floor_id,
      updated_at: rootnode.descendant.updated_at,
      floortype: rootnode.descendant.floortype,
      floorname: rootnode.descendant.floorname,
      order: rootnode.descendant.order,
      children: [],
    };
  });

  // 祖先を取得する
  const ancestors = (await FloorsRepository.findAncestors(root.floor_id)).map((rootnode) => {
    return {
      floor_id: rootnode.ancestor.floor_id,
      updated_at: rootnode.ancestor.updated_at,
      floortype: rootnode.ancestor.floortype,
      floorname: rootnode.ancestor.floorname,
      order: rootnode.ancestor.order,
    };
  });

  return {
    floor_id: root.floor_id,
    updated_at: root.updated_at,
    floortype: root.floortype,
    floorname: root.floorname,
    order: root.order,
    children,
    ancestors,
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
const getFloor = async (currentUser: CurrentUserType, floor_id: number) => {
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

// # PATCH /api/floors/order
const patchFloorsOrder = async (currentUser: CurrentUserType, floor_id_list: number[]) => {
  log.debug("patchFloorsOrder", floor_id_list);

  return Promise.all(
    floor_id_list.map((floor_id, index) => {
      return FloorsRepository.patchFloor(currentUser, floor_id, {
        order: index + 1,
      });
    })
  );
};

// # PATCH /api/floors/node
const patchFloorsNode = async (currentUser: CurrentUserType, body: FloorsNodeBody) => {
  log.debug("patchFloorsNode", body);

  // 前の祖先ノードから子孫を削除する
  const currentAncestors = await FloorsRepository.findAncestors(body.child_id);
  const descendants = await FloorsRepository.findDescendants(body.child_id);
  const descendant_id_list = descendants.map((descendant) => descendant.descendant_id);

  await Promise.all(
    currentAncestors
      .filter((ancestor) => ancestor.ancestor_id !== body.child_id)
      .map((ancestor) =>
        FloorsRepository.deleteMany({
          ancestor_id: ancestor.ancestor_id,
          descendant_id: {
            in: descendant_id_list,
          },
        })
      )
  );

  // 祖先の距離は親から祖先の距離＋１してノードを登録する
  const newAncestors = await FloorsRepository.findAncestors(body.parent_id);

  const data = newAncestors.flatMap((ancestor) => {
    return descendants.map((descendant) => {
      return {
        ancestor_id: ancestor.ancestor_id,
        descendant_id: descendant.descendant_id,
        distance: ancestor.distance + 1 + descendant.distance,
      };
    });
  });

  await FloorsRepository.createMany(data);
};

export const FloorsService = {
  postFloor,
  getFloors,
  putFloor,
  getFloor,
  deleteFloor,
  patchFloorsOrder,
  patchFloorsNode,
};
