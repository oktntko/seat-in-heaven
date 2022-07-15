import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Request } from "express";
import { Session, SessionData } from "express-session";
import { Body, CurrentUser, Delete, Get, JsonController, Post, Req } from "routing-controllers";
import { ResponseSchema } from "routing-controllers-openapi";
import { AuthService } from "~/services/auth.service";
import { CurrentUserType, OkResponse } from "~/types";

class PostAuthBody {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  password: string;
}

@JsonController()
export class AuthController {
  @Get("/api/auth")
  @ResponseSchema(OkResponse)
  async getAuth(@CurrentUser({ required: true }) _: CurrentUserType) {
    return { ok: true };
  }

  @Post("/api/auth")
  @ResponseSchema(OkResponse)
  async postAuth(@Req() req: Request, @Body({ required: true }) body: PostAuthBody) {
    // セッションの再生成
    await regenerate(req.session);

    const user = await AuthService.postAuth(body);

    // session のプロパティに代入することで、 SessionStore#set が呼ばれる. (非同期)
    req.session.user_id = user.user_id;

    return { ok: true };
  }

  @Delete("/api/auth")
  @ResponseSchema(OkResponse)
  async deleteAuth(@Req() req: Request) {
    req.session.destroy(() => {
      /*Nothing To Do*/
    });

    return { ok: true };
  }
}

const regenerate = async (
  session: Session & Partial<SessionData>
): Promise<Session & Partial<SessionData>> => {
  return new Promise((resolve, reject) => {
    const oldsession = session.regenerate((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(oldsession);
      }
    });
  });
};
