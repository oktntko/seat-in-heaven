import { UsersQuery } from "~/controllers/api/users.controller";
import { NotExistsError } from "~/middlewares/ErrorHandler";
import log from "~/middlewares/log";
import { ParamUser, UsersRepository } from "~/repositories/users.repository";
import { CurrentUserType } from "~/types";

// # POST /api/users
const postUser = async (currentUser: CurrentUserType, user: ParamUser) => {
  log.debug("postUser", user);

  await UsersRepository.checkDuplicate({ email: user.email });

  return UsersRepository.createUser(currentUser, user);
};

// # GET /api/users
const getUsers = async (query: UsersQuery) => {
  log.debug("getUsers", query);

  const where = {};
  if (query.roles?.length) {
    Object.assign(where, {
      role: { in: query.roles },
    });
  }

  if (query.keyword) {
    Object.assign(where, {
      OR: [{ email: { contains: query.keyword } }, { username: { contains: query.keyword } }],
    });
  }

  log.debug("where", where);

  const total = await UsersRepository.countUsers(where);
  const users = await UsersRepository.findManyUsers(where, query);

  return {
    total,
    users,
  };
};

// # PUT /api/users/:user_id
const putUser = async (
  currentUser: CurrentUserType,
  user_id: number,
  user: ParamUser,
  updated_at: string
) => {
  log.debug("putUser", user);

  await UsersRepository.checkDuplicate({ email: user.email }, user_id);

  await UsersRepository.checkPreviousVersion({ user_id }, updated_at);

  return UsersRepository.updateUser(currentUser, user_id, user);
};

// # GET /api/users/:user_id
const getUser = async (currentUser: CurrentUserType, user_id: number) => {
  log.debug("getUser", user_id);

  const user = await UsersRepository.findUniqueUser({ user_id });
  if (!user) {
    throw new NotExistsError();
  }

  return user;
};

// # DELETE /api/users/:user_id
const deleteUser = async (currentUser: CurrentUserType, user_id: number, updated_at: string) => {
  log.debug("deleteUser", user_id);

  await UsersRepository.checkPreviousVersion({ user_id }, updated_at);

  return UsersRepository.deleteUser(currentUser, user_id);
};

export const UsersService = {
  postUser,
  getUsers,
  putUser,
  getUser,
  deleteUser,
};
