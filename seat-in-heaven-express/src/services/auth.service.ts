import { BadRequestError } from "routing-controllers";
import log from "~/middlewares/log";
import { UsersRepository } from "~/repositories/users.repository";

// # POST /api/auth
const postAuth = async (params: { email: string; password: string }) => {
  log.debug("postAuth");
  const user = await UsersRepository.findUniqueUserPassword({ email: params.email });
  if (!user) {
    throw new BadRequestError(
      `ログインに失敗しました。登録されていないメールアドレスか、パスワードが一致しません。`
    );
  }

  const isValidPassword = params.password === user.password;
  if (!isValidPassword) {
    throw new BadRequestError(
      `ログインに失敗しました。登録されていないメールアドレスか、パスワードが一致しません。`
    );
  }

  return {
    user_id: user.user_id,
    email: user.email,
    username: user.username,
  };
};

export const AuthService = {
  postAuth,
};
