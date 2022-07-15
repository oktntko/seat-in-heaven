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
    users: async (
      body: paths["/api/users"]["post"]["requestBody"]["content"]["application/json"]
    ) => {
      return client.post<
        paths["/api/users"]["post"]["responses"]["200"]["content"]["application/json"]
      >(`/api/users`, body);
    },
  },
  put: {
    users: async (
      path: paths["/api/users/{user_id}"]["put"]["parameters"]["path"],
      body: paths["/api/users/{user_id}"]["put"]["requestBody"]["content"]["application/json"]
    ) => {
      return client.put<
        paths["/api/users/{user_id}"]["put"]["responses"]["200"]["content"]["application/json"]
      >(`/api/users/${path.user_id}`, body);
    },
  },
  delete: {
    users: async (
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

export const api = {
  get: {
    ...auth.get,
    ...users.get,
  },
  post: {
    ...auth.post,
    ...users.post,
  },
  put: {
    ...users.put,
  },
  delete: {
    ...auth.delete,
    ...users.delete,
  },
};
