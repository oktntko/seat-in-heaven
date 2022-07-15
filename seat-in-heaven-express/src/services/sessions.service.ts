import { plainToClass } from "class-transformer";
import { Cookie, SessionData } from "express-session";
import dayjs from "~/libs/dayjs";
import log from "~/middlewares/log";
import { SessionsRepository } from "~/repositories/sessions.repository";

// # session.get
const getSession = async (sid: string) => {
  log.debug("getSession", sid);
  const foundSession = await SessionsRepository.findUniqueSession({ session_key: sid });

  if (foundSession == null) {
    log.debug("Not Found Session.");
    return null;
  } else {
    const data = JSON.parse(foundSession.data);
    const cookie = plainToClass(Cookie, data.cookie);

    if (!cookie.expires || dayjs(cookie.expires).isBefore(dayjs())) {
      log.debug("Session has expired.");
      return null;
    } else {
      return {
        cookie: data.cookie,
        user_id: data.user_id,
      };
    }
  }
};

// # session.set
const postSession = async (sid: string, session: SessionData) => {
  log.debug("postSession", sid);
  return SessionsRepository.upsertSession({
    session_key: sid,
    data: JSON.stringify({
      cookie: session.cookie,
      user_id: session.user_id ?? null,
    }),
  });
};

// # session.destory
const deleteSession = async (sid: string) => {
  log.debug("deleteSession", sid);
  const foundSession = await SessionsRepository.findUniqueSession({ session_key: sid });

  if (foundSession == null) {
    log.debug("Not Found Session.");
  } else {
    await SessionsRepository.deleteSession({ session_key: sid });
  }
};

export const SessionsService = {
  getSession,
  postSession,
  deleteSession,
};
