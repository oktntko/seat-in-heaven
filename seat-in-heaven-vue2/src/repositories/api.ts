import qs from "qs";
import client from "~/libs/axios";
import { paths } from "~/repositories/schema";

const users = {
  get: {
    users: async (query: paths["/api/users"]["get"]["parameters"]["query"]) => {
      return client.get<
        paths["/api/users"]["get"]["responses"]["200"]["content"]["application/json"]
      >(`/api/users`, {
        params: query,
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "indices" }),
      });
    },
    user: async (path: paths["/api/users/{user_id}"]["get"]["parameters"]["path"]) => {
      return client.get<
        paths["/api/users/{user_id}"]["get"]["responses"]["200"]["content"]["application/json"]
      >(`/api/users/${path.user_id}`);
    },
  },
  post: {
    user: async (
      body: paths["/api/users"]["post"]["requestBody"]["content"]["application/json"]
    ) => {
      return client.post<
        paths["/api/users"]["post"]["responses"]["200"]["content"]["application/json"]
      >(`/api/users`, body);
    },
  },
  put: {
    user: async (
      path: paths["/api/users/{user_id}"]["put"]["parameters"]["path"],
      body: paths["/api/users/{user_id}"]["put"]["requestBody"]["content"]["application/json"]
    ) => {
      return client.put<
        paths["/api/users/{user_id}"]["put"]["responses"]["200"]["content"]["application/json"]
      >(`/api/users/${path.user_id}`, body);
    },
  },
  delete: {
    user: async (
      path: paths["/api/users/{user_id}"]["delete"]["parameters"]["path"],
      query: paths["/api/users/{user_id}"]["delete"]["parameters"]["query"]
    ) => {
      return client.delete<
        paths["/api/users/{user_id}"]["delete"]["responses"]["200"]["content"]["application/json"]
      >(`/api/users/${path.user_id}`, { params: query });
    },
  },
};

const auth = {
  get: {
    auth: async () => {
      return client.get<
        paths["/api/auth"]["get"]["responses"]["200"]["content"]["application/json"]
      >(`/api/auth`);
    },
  },
  post: {
    auth: async (
      body: paths["/api/auth"]["post"]["requestBody"]["content"]["application/json"]
    ) => {
      return client.post<
        paths["/api/auth"]["post"]["responses"]["200"]["content"]["application/json"]
      >(`/api/auth`, body);
    },
  },
  delete: {
    auth: async () => {
      return client.delete<
        paths["/api/auth"]["delete"]["responses"]["200"]["content"]["application/json"]
      >(`/api/auth`);
    },
  },
};

const floors = {
  get: {
    floors: async (query: paths["/api/floors"]["get"]["parameters"]["query"]) => {
      return client.get<
        paths["/api/floors"]["get"]["responses"]["200"]["content"]["application/json"]
      >(`/api/floors`, {
        params: query,
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "indices" }),
      });
    },
    floor: async (path: paths["/api/floors/{floor_id}"]["get"]["parameters"]["path"]) => {
      return client.get<
        paths["/api/floors/{floor_id}"]["get"]["responses"]["200"]["content"]["application/json"]
      >(`/api/floors/${path.floor_id}`);
    },
  },
  post: {
    floor: async (
      body: paths["/api/floors"]["post"]["requestBody"]["content"]["application/json"]
    ) => {
      return client.post<
        paths["/api/floors"]["post"]["responses"]["200"]["content"]["application/json"]
      >(`/api/floors`, body);
    },
  },
  put: {
    floor: async (
      path: paths["/api/floors/{floor_id}"]["put"]["parameters"]["path"],
      body: paths["/api/floors/{floor_id}"]["put"]["requestBody"]["content"]["application/json"]
    ) => {
      return client.put<
        paths["/api/floors/{floor_id}"]["put"]["responses"]["200"]["content"]["application/json"]
      >(`/api/floors/${path.floor_id}`, body);
    },
  },
  delete: {
    floor: async (
      path: paths["/api/floors/{floor_id}"]["delete"]["parameters"]["path"],
      query: paths["/api/floors/{floor_id}"]["delete"]["parameters"]["query"]
    ) => {
      return client.delete<
        paths["/api/floors/{floor_id}"]["delete"]["responses"]["200"]["content"]["application/json"]
      >(`/api/floors/${path.floor_id}`, { params: query });
    },
  },
  patch: {
    floors: {
      order: async (
        body: paths["/api/floors/order"]["patch"]["requestBody"]["content"]["application/json"]
      ) => {
        return client.patch<
          paths["/api/floors/order"]["patch"]["responses"]["200"]["content"]["application/json"]
        >(`/api/floors/order`, body);
      },
      node: async (
        body: paths["/api/floors/node"]["patch"]["requestBody"]["content"]["application/json"]
      ) => {
        return client.patch<
          paths["/api/floors/node"]["patch"]["responses"]["200"]["content"]["application/json"]
        >(`/api/floors/node`, body);
      },
    },
  },
};

export const api = {
  get: {
    ...auth.get,
    ...floors.get,
    ...users.get,
  },
  post: {
    ...auth.post,
    ...floors.post,
    ...users.post,
  },
  put: {
    ...users.put,
    ...floors.put,
  },
  delete: {
    ...auth.delete,
    ...floors.delete,
    ...users.delete,
  },
  patch: {
    ...floors.patch,
  },
};
