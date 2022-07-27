import { FloorType } from "@prisma/client";
import { FloorsNodeBody } from "~/controllers/api/floors.controller";
import { NotExistsError } from "~/middlewares/ErrorHandler";
import log from "~/middlewares/log";
import { FloornodesRepository } from "~/repositories/floornodes.repository";
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
  const parent = await FloorsRepository.findUniqueFloor({ floor_id: parent_id });
  if (!parent) {
    throw new NotExistsError();
  }

  // 親の子（＝兄弟）を取得する
  const children = await FloornodesRepository.findDescendants({
    ancestor_id: parent_id,
    distance: 1,
  });

  // 親含む祖先を取得する
  const ancestors = await FloornodesRepository.findAncestors({ descendant_id: parent_id });

  return FloorsRepository.createFloor(
    currentUser,
    {
      floortype: floor.floortype,
      floorname: floor.floorname,
      order: children.length + 1,
    },
    // 祖先の距離は親から祖先の距離＋１してノードを登録する
    ancestors.map((ancestor) => ({
      ancestor_id: ancestor.ancestor_id,
      distance: ancestor.distance + 1,
    }))
  );
};

// # GET /api/floors
const getFloors = async (floor_id?: number) => {
  log.debug("getFloors", floor_id);

  const root = floor_id
    ? await FloorsRepository.findUniqueFloor({ floor_id })
    : await FloorsRepository.findRootFloor();
  if (!root) {
    throw new NotExistsError();
  }

  // 子を取得する
  const children = (
    await FloornodesRepository.findDescendants({
      ancestor_id: root.floor_id,
      distance: 1,
    })
  ).map((rootnode) => ({
    ...rootnode.descendant,
    children: [],
  }));

  // 祖先を取得する
  const ancestors = (await FloornodesRepository.findAncestors({ descendant_id: root.floor_id }))
    .map((rootnode) => rootnode.ancestor)
    .filter((ancestor) => ancestor.floortype !== FloorType.ROOT);

  return {
    ...root,
    children,
    ancestors,
  };
};

// # PUT /api/floors/:floor_id
const putFloor = async (
  currentUser: CurrentUserType,
  floor_id: number,
  floor: Omit<ParamFloor, "floortype" | "order">,
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

  // 子孫を取得する
  const descendants = await FloornodesRepository.findDescendants({
    ancestor_id: floor_id,
  });

  return FloorsRepository.deleteManyFloor(currentUser, [
    floor_id,
    ...descendants.map((descendant) => descendant.descendant_id),
  ]);
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

  // 現在の祖先ノードから外れる
  const currentAncestors = await FloornodesRepository.findAncestors({
    descendant_id: body.floor_id,
    distance: { gt: 0 },
  });

  const descendants = await FloornodesRepository.findDescendants({
    ancestor_id: body.floor_id,
  });
  const descendant_id_list = descendants.map((descendant) => descendant.descendant_id);

  await Promise.all(
    currentAncestors.map((ancestor) =>
      FloornodesRepository.deleteMany({
        ancestor_id: ancestor.ancestor_id,
        descendant_id: {
          in: descendant_id_list,
        },
      })
    )
  );

  // 新しい祖先ノードに加わる
  const newAncestors = await FloornodesRepository.findAncestors({
    descendant_id: body.parent_id,
  });

  const data = newAncestors.flatMap((ancestor) =>
    descendants.map((descendant) => ({
      ancestor_id: ancestor.ancestor_id,
      descendant_id: descendant.descendant_id,
      distance: ancestor.distance + 1 /*親を基準にしているので＋１する*/ + descendant.distance,
    }))
  );

  await FloornodesRepository.createMany(data);
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
