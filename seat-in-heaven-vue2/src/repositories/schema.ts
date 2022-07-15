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
    UsersBody: {
      /** Format: email */
      email: string;
      username: string;
      /** @enum {string} */
      role: "SYSTEM_ADMIN" | "LIMITED_ADMIN" | "USER";
    };
    UsersPathParams: {
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
    /** UsersBody */
    requestBody: {
      content: {
        "application/json": components["schemas"]["UsersBody"];
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
    /** UsersBody */
    requestBody: {
      content: {
        "application/json": components["schemas"]["UsersBody"] & {
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
