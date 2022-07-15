import { Role } from "@prisma/client";
import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  ValidateNested,
} from "class-validator";
import {
  Body,
  BodyParam,
  CurrentUser,
  Delete,
  Get,
  JsonController,
  Params,
  Post,
  Put,
  QueryParam,
  QueryParams,
} from "routing-controllers";
import { ResponseSchema } from "routing-controllers-openapi";
import { transformerEmptyToUndefined } from "~/libs/transformers";
import log from "~/middlewares/log";
import { UsersService } from "~/services/users.service";
import { CurrentUserType } from "~/types";

// ::: REQUEST
class UsersBody {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsIn([Role.SYSTEM_ADMIN, Role.LIMITED_ADMIN, Role.USER])
  role: Role;
}

class UsersPathParams {
  @IsPositive()
  user_id: number;
}

export class UsersQuery {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Transform(transformerEmptyToUndefined)
  keyword?: string;

  @IsOptional()
  @IsString({ each: true })
  @IsIn([Role.SYSTEM_ADMIN, Role.LIMITED_ADMIN, Role.USER], { each: true })
  @IsArray()
  @Type(() => String)
  roles?: string[];

  @IsNotEmpty()
  @IsInt()
  limit: number;

  @IsNotEmpty()
  @IsInt()
  offset: number;
}

// ::: RESPONSE
class UserResponse {
  @IsPositive()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsIn([Role.SYSTEM_ADMIN, Role.LIMITED_ADMIN, Role.USER])
  role: Role;

  @IsNotEmpty()
  @IsDate()
  updated_at: Date;
}

class ListUserResponse {
  @IsInt()
  total: number;

  @ValidateNested({ each: true })
  @Type(() => UserResponse)
  users: UserResponse[];
}

@JsonController()
export class UsersController {
  // # POST /api/users
  @Post("/api/users")
  @ResponseSchema(UserResponse)
  async postUser(
    @CurrentUser({ required: true }) currentUser: CurrentUserType,
    @Body({ required: true }) body: UsersBody
  ): Promise<UserResponse> {
    log.debug(currentUser, body);

    return UsersService.postUser(currentUser, body);
  }

  // # GET /api/users
  @Get("/api/users")
  @ResponseSchema(ListUserResponse)
  async getUsers(
    @CurrentUser({ required: true }) currentUser: CurrentUserType,
    @QueryParams() query: UsersQuery
  ): Promise<ListUserResponse> {
    log.debug(currentUser, query);

    return UsersService.getUsers(query);
  }

  // # PUT /api/users/:user_id
  @Put("/api/users/:user_id")
  @ResponseSchema(UserResponse)
  async putUser(
    @CurrentUser({ required: true }) currentUser: CurrentUserType,
    @Params({ required: true }) path: UsersPathParams,
    @Body({ required: true }) body: UsersBody,
    @BodyParam("updated_at", { required: true }) updated_at: string
  ): Promise<UserResponse> {
    log.debug(currentUser, body);

    return UsersService.putUser(currentUser, path.user_id, body, updated_at);
  }

  // # GET /api/users/:user_id
  @Get("/api/users/:user_id")
  @ResponseSchema(UserResponse)
  async getUser(
    @CurrentUser({ required: true }) currentUser: CurrentUserType,
    @Params({ required: true }) path: UsersPathParams
  ): Promise<UserResponse> {
    log.debug(currentUser);

    return UsersService.getUser(currentUser, path.user_id);
  }

  // # DELETE /api/users/:user_id
  @Delete("/api/users/:user_id")
  @ResponseSchema(UserResponse)
  async deleteUser(
    @CurrentUser({ required: true }) currentUser: CurrentUserType,
    @Params({ required: true }) path: UsersPathParams,
    @QueryParam("updated_at", { required: true }) updated_at: string
  ): Promise<UserResponse> {
    log.debug(currentUser);

    return UsersService.deleteUser(currentUser, path.user_id, updated_at);
  }
}
