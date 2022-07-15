import { User } from "@prisma/client";
import { IsBoolean } from "class-validator";

export type CurrentUserType = Pick<User, "user_id">;

export class OkResponse {
  @IsBoolean()
  ok: true;
}
