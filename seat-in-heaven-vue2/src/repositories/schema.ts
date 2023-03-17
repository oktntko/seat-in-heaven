/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export type paths = {
  "/api/auth": {
    get: operations["AuthController.getAuth"];
    post: operations["AuthController.postAuth"];
    delete: operations["AuthController.deleteAuth"];
  };
  "/api/floors": {
    get: operations["FloorsController.getFloors"];
    post: operations["FloorsController.postFloor"];
  };
  "/api/floors/{floor_id}": {
    get: operations["FloorsController.getFloor"];
    put: operations["FloorsController.putFloor"];
    delete: operations["FloorsController.deleteFloor"];
  };
  "/api/floors/order": {
    patch: operations["FloorsController.patchFloorsOrder"];
  };
  "/api/floors/node": {
    patch: operations["FloorsController.patchFloorsNode"];
  };
  "/api/rooms": {
    get: operations["RoomsController.getRooms"];
    post: operations["RoomsController.postFloor"];
  };
  "/api/rooms/{room_id}": {
    get: operations["RoomsController.getFloor"];
    put: operations["RoomsController.putFloor"];
    delete: operations["RoomsController.deleteFloor"];
  };
  "/api/users": {
    get: operations["UsersController.getUsers"];
    post: operations["UsersController.postUser"];
  };
  "/api/users/{user_id}": {
    get: operations["UsersController.getUser"];
    put: operations["UsersController.putUser"];
    delete: operations["UsersController.deleteUser"];
  };
  "/openapi": {
    get: operations["OpenapiController.getOpenApi"];
  };
};

export type components = {
  schemas: {
    OkResponse: {
      ok: boolean;
    };
    PostAuthBody: {
      /** Format: email */
      email: string;
      password: string;
    };
    FloorBody: {
      floorname: string;
    };
    PostFloorBody: {
      /** @enum {string} */
      floortype: "FLOOR" | "ROOM";
      floorname: string;
      parent_id: number;
    };
    FloorsPathParams: {
      floor_id: number;
    };
    FloorsQuery: {
      floor_id?: number;
    };
    FloorsOrderBody: {
      floor_id_list: number[];
    };
    FloorsNodeBody: {
      parent_id: number;
      floor_id: number;
    };
    FloorResponse: {
      floor_id: number;
      /** @enum {string} */
      floortype: "FLOOR" | "ROOM";
      floorname: string;
      order: number;
      updated_at: string;
    };
    FloorResponseWithChildren: {
      children: components["schemas"]["FloorResponse"][];
      floor_id: number;
      /** @enum {string} */
      floortype: "FLOOR" | "ROOM";
      floorname: string;
      order: number;
      updated_at: string;
    };
    RootFloorResponse: {
      ancestors: components["schemas"]["FloorResponse"][];
      children: components["schemas"]["FloorResponseWithChildren"][];
      floor_id: number;
      /** @enum {string} */
      floortype: "FLOOR" | "ROOM";
      floorname: string;
      order: number;
      updated_at: string;
    };
    RoomsQuery: {
      keyword?: string;
    };
    RoomFloorResponse: {
      ancestors: components["schemas"]["FloorResponse"][];
      floor_id: number;
      /** @enum {string} */
      floortype: "FLOOR" | "ROOM";
      floorname: string;
      order: number;
      updated_at: string;
    };
    ListRoomFloorResponse: {
      rooms: components["schemas"]["RoomFloorResponse"][];
    };
    UserBody: {
      /** Format: email */
      email: string;
      username: string;
      /** @enum {string} */
      role: "SYSTEM_ADMIN" | "LIMITED_ADMIN" | "USER";
    };
    UserPathParams: {
      user_id: number;
    };
    UsersQuery: {
      keyword?: string;
      roles?: ("SYSTEM_ADMIN" | "LIMITED_ADMIN" | "USER")[];
      limit: string;
      offset: string;
    };
    UserResponse: {
      user_id: number;
      /** Format: email */
      email: string;
      username: string;
      /** @enum {string} */
      role: "SYSTEM_ADMIN" | "LIMITED_ADMIN" | "USER";
      updated_at: string;
    };
    ListUserResponse: {
      total: number;
      users: components["schemas"]["UserResponse"][];
    };
  };
};

export type operations = {
  "AuthController.getAuth": {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["OkResponse"];
        };
      };
    };
  };
  "AuthController.postAuth": {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["OkResponse"];
        };
      };
    };
    /** PostAuthBody */
    requestBody: {
      content: {
        "application/json": components["schemas"]["PostAuthBody"];
      };
    };
  };
  "AuthController.deleteAuth": {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["OkResponse"];
        };
      };
    };
  };
  "FloorsController.getFloors": {
    parameters: {
      query: {
        floor_id?: number;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["RootFloorResponse"];
        };
      };
    };
  };
  "FloorsController.postFloor": {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["FloorResponse"];
        };
      };
    };
    /** PostFloorBody */
    requestBody: {
      content: {
        "application/json": components["schemas"]["PostFloorBody"];
      };
    };
  };
  "FloorsController.getFloor": {
    parameters: {
      path: {
        floor_id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["FloorResponse"];
        };
      };
    };
  };
  "FloorsController.putFloor": {
    parameters: {
      path: {
        floor_id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["FloorResponse"];
        };
      };
    };
    /** FloorBody */
    requestBody: {
      content: {
        "application/json": components["schemas"]["FloorBody"] & {
          updated_at: string;
        };
      };
    };
  };
  "FloorsController.deleteFloor": {
    parameters: {
      path: {
        floor_id: string;
      };
      query: {
        updated_at: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["OkResponse"];
        };
      };
    };
  };
  "FloorsController.patchFloorsOrder": {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["OkResponse"];
        };
      };
    };
    /** FloorsOrderBody */
    requestBody: {
      content: {
        "application/json": components["schemas"]["FloorsOrderBody"];
      };
    };
  };
  "FloorsController.patchFloorsNode": {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["OkResponse"];
        };
      };
    };
    /** FloorsNodeBody */
    requestBody: {
      content: {
        "application/json": components["schemas"]["FloorsNodeBody"];
      };
    };
  };
  "RoomsController.getRooms": {
    parameters: {
      query: {
        keyword?: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["ListRoomFloorResponse"];
        };
      };
    };
  };
  "RoomsController.postFloor": {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["FloorResponse"];
        };
      };
    };
    /** PostFloorBody */
    requestBody: {
      content: {
        "application/json": components["schemas"]["PostFloorBody"];
      };
    };
  };
  "RoomsController.getFloor": {
    parameters: {
      path: {
        room_id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["FloorResponse"];
        };
      };
    };
  };
  "RoomsController.putFloor": {
    parameters: {
      path: {
        room_id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["FloorResponse"];
        };
      };
    };
    /** FloorBody */
    requestBody: {
      content: {
        "application/json": components["schemas"]["FloorBody"] & {
          updated_at: string;
        };
      };
    };
  };
  "RoomsController.deleteFloor": {
    parameters: {
      path: {
        room_id: string;
      };
      query: {
        updated_at: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["OkResponse"];
        };
      };
    };
  };
  "UsersController.getUsers": {
    parameters: {
      query: {
        keyword?: string;
        roles?: ("SYSTEM_ADMIN" | "LIMITED_ADMIN" | "USER")[];
        limit: string;
        offset: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["ListUserResponse"];
        };
      };
    };
  };
  "UsersController.postUser": {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["UserResponse"];
        };
      };
    };
    /** UserBody */
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserBody"];
      };
    };
  };
  "UsersController.getUser": {
    parameters: {
      path: {
        user_id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["UserResponse"];
        };
      };
    };
  };
  "UsersController.putUser": {
    parameters: {
      path: {
        user_id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["UserResponse"];
        };
      };
    };
    /** UserBody */
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserBody"] & {
          updated_at: string;
        };
      };
    };
  };
  "UsersController.deleteUser": {
    parameters: {
      path: {
        user_id: string;
      };
      query: {
        updated_at: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["UserResponse"];
        };
      };
    };
  };
  "OpenapiController.getOpenApi": {
    responses: {
      /** Successful response */
      200: {
        content: {
          "application/json": unknown;
        };
      };
    };
  };
};
