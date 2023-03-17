import { Prisma, User } from "@prisma/client";
import ORM from "~/arch/ORM";
import dayjs from "~/libs/dayjs";
import {
  AlreadyExistsError,
  NotExistsError,
  UpdateConflictsError,
} from "~/middlewares/ErrorHandler";
import log from "~/middlewares/log";
import { CurrentUserType } from "~/types";

export type ParamUser = Omit<
  User,
  "user_id" | "password" | "created_at" | "created_by" | "updated_at" | "updated_by"
>;

const createUser = async (currentUser: CurrentUserType, user: ParamUser) => {
  log.debug("createUser", currentUser);

  return ORM.user.create({
    select: {
      user_id: true,
      email: true,
      username: true,
      role: true,
      updated_at: true,
      updated_by: true,
    },
    data: {
      email: user.email,
      username: user.username,
      password: user.email, // TODO
      role: user.role,
      created_by: currentUser.user_id,
      updated_by: currentUser.user_id,
    },
  });
};

const updateUser = async (currentUser: CurrentUserType, user_id: number, user: ParamUser) => {
  log.debug("updateUser", currentUser);

  return ORM.user.update({
    select: {
      user_id: true,
      email: true,
      username: true,
      role: true,
      updated_at: true,
      updated_by: true,
    },
    data: {
      email: user.email,
      username: user.username,
      password: user.email, // TODO
      role: user.role,
      updated_by: currentUser.user_id,
    },
    where: { user_id },
  });
};

const patchUser = async (
  currentUser: CurrentUserType,
  user_id: number,
  user: Partial<ParamUser>
) => {
  log.debug("patchUser", currentUser);

  return ORM.user.update({
    select: {
      user_id: true,
      email: true,
      username: true,
      role: true,
      updated_at: true,
      updated_by: true,
    },
    data: {
      email: user.email,
      username: user.username,
      password: user.email, // TODO
      role: user.role,
      updated_by: currentUser.user_id,
    },
    where: { user_id },
  });
};

const deleteUser = async (currentUser: CurrentUserType, user_id: number) => {
  log.debug("deleteUser", currentUser);

  return ORM.user.delete({
    select: {
      user_id: true,
      email: true,
      username: true,
      role: true,
      updated_at: true,
      updated_by: true,
    },
    where: { user_id },
  });
};

const findUniqueUser = async ({ user_id, email }: RequireOne<Prisma.UserWhereUniqueInput>) => {
  log.info("findUniqueUser");

  return ORM.user.findUnique({
    select: {
      user_id: true,
      email: true,
      username: true,
      role: true,
      updated_at: true,
      updated_by: true,
    },
    where: user_id != null ? { user_id } : { email },
  });
};

const findUniqueUserPassword = async ({
  user_id,
  email,
}: RequireOne<Prisma.UserWhereUniqueInput>) => {
  log.info("findUniqueUserPassword");

  return ORM.user.findUnique({
    select: {
      user_id: true,
      email: true,
      username: true,
      password: true,
      role: true,
      updated_at: true,
      updated_by: true,
    },
    where: user_id != null ? { user_id } : { email },
  });
};

const countUsers = async (where: Prisma.UserWhereInput) => {
  log.info("countUsers");

  return ORM.user.count({
    where,
  });
};

const findManyUsers = async (where: Prisma.UserWhereInput, pager: Pager) => {
  log.info("findManyUsers");

  return ORM.user.findMany({
    select: {
      user_id: true,
      email: true,
      username: true,
      role: true,
      updated_at: true,
      updated_by: true,
    },
    where,
    take: pager.limit,
    skip: pager.offset,
  });
};

const checkDuplicate = async (where: RequireOne<Prisma.UserWhereUniqueInput>, user_id?: number) => {
  const duplicate = await findUniqueUser(where);
  if (duplicate && (user_id == null || duplicate.user_id !== user_id)) {
    throw new AlreadyExistsError();
  }

  return duplicate;
};

const checkPreviousVersion = async (
  where: RequireOne<Prisma.UserWhereUniqueInput>,
  updated_at: string
) => {
  const previous = await findUniqueUser(where);

  if (!previous) {
    throw new NotExistsError();
  } else if (!dayjs(previous.updated_at).isSame(updated_at)) {
    throw new UpdateConflictsError();
  }

  return previous;
};

export const UsersRepository = {
  createUser,
  updateUser,
  patchUser,
  deleteUser,
  findUniqueUser,
  findUniqueUserPassword,
  countUsers,
  findManyUsers,
  checkDuplicate,
  checkPreviousVersion,
};
