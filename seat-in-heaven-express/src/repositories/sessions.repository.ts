import { Prisma } from "@prisma/client";
import ORM from "~/arch/ORM";
import log from "~/middlewares/log";

const findUniqueSession = async ({
  session_id,
  session_key,
}: RequireOne<Prisma.SessionWhereUniqueInput>) => {
  log.info("findUniqueSession");
  return ORM.session.findUnique({
    select: {
      session_id: true,
      session_key: true,
      data: true,
    },
    where: session_id != null ? { session_id } : { session_key },
  });
};

const upsertSession = async (param: Prisma.SessionUncheckedCreateInput) => {
  log.info("upsertSession");
  return ORM.session.upsert({
    select: {
      session_id: true,
      session_key: true,
      data: true,
    },
    where: { session_key: param.session_key },
    create: {
      session_key: param.session_key,
      data: param.data,
    },
    update: { data: param.data },
  });
};

const deleteSession = async ({
  session_id,
  session_key,
}: RequireOne<Prisma.SessionWhereUniqueInput>) => {
  log.info("deleteSession");
  return ORM.session.delete({
    select: {
      session_id: true,
      session_key: true,
      data: true,
    },
    where: session_id != null ? { session_id } : { session_key },
  });
};

export const SessionsRepository = {
  findUniqueSession,
  upsertSession,
  deleteSession,
};
