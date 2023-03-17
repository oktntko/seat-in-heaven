import { FloorType } from "@prisma/client";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDate,
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
  Put,
  QueryParam,
  QueryParams,
} from "routing-controllers";
import { ResponseSchema } from "routing-controllers-openapi";
import log from "~/middlewares/log";
import { FloorsService } from "~/services/floors.service";
import { CurrentUserType, OkResponse } from "~/types";

// ::: REQUEST
export class FloorBody {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  floorname: string;
}

export class PostFloorBody {
  @IsNotEmpty()
  @IsString()
  @IsIn([FloorType.FLOOR, FloorType.ROOM])
  floortype: FloorType;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  floorname: string;

  @IsPositive()
  parent_id: number;
}

class FloorsPathParams {
  @IsPositive()
  floor_id: number;
}

export class FloorsQuery {
  @IsOptional()
  @IsPositive()
  floor_id?: number;
}

export class FloorsOrderBody {
  @IsArray()
  @IsPositive({ each: true })
  floor_id_list: number[];
}

export class FloorsNodeBody {
  @IsPositive()
  parent_id: number;
  @IsPositive()
  floor_id: number;
}

// ::: RESPONSE
export class FloorResponse {
  @IsPositive()
  floor_id: number;

  @IsNotEmpty()
  @IsString()
  @IsIn([FloorType.FLOOR, FloorType.ROOM])
  floortype: FloorType;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  floorname: string;

  @IsInt()
  order: number;

  @IsNotEmpty()
  @IsDate()
  updated_at: Date;
}

class FloorResponseWithChildren extends FloorResponse {
  @ValidateNested({ each: true })
  @Type(() => FloorResponse)
  children: FloorResponse[];
}

class RootFloorResponse extends FloorResponse {
  @ValidateNested({ each: true })
  @Type(() => FloorResponse)
  ancestors: FloorResponse[];
  @ValidateNested({ each: true })
  @Type(() => FloorResponseWithChildren)
  children: FloorResponseWithChildren[];
}

@JsonController()
export class FloorsController {
  // # GET /api/rooms_objects
  @Get("/api/rooms_objects")
  @ResponseSchema(RootFloorResponse)
  async getFloors(
    @CurrentUser({ required: true }) currentUser: CurrentUserType,
    @QueryParams() query: FloorsQuery
  ): Promise<RootFloorResponse> {
    log.debug(currentUser, query);

    return FloorsService.getFloors(query.floor_id);
  }

  // # PUT /api/rooms_objects/:floor_id
  @Put("/api/rooms_objects/:floor_id")
  @ResponseSchema(FloorResponse)
  async putFloor(
    @CurrentUser({ required: true }) currentUser: CurrentUserType,
    @Params({ required: true }) path: FloorsPathParams,
    @Body({ required: true }) body: FloorBody,
    @BodyParam("updated_at", { required: true }) updated_at: string
  ): Promise<FloorResponse> {
    log.debug(currentUser, body);

    return FloorsService.putFloor(currentUser, path.floor_id, body, updated_at);
  }

  // # GET /api/rooms_objects/:floor_id
  @Get("/api/rooms_objects/:floor_id")
  @ResponseSchema(FloorResponse)
  async getFloor(
    @CurrentUser({ required: true }) currentUser: CurrentUserType,
    @Params({ required: true }) path: FloorsPathParams
  ): Promise<FloorResponse> {
    log.debug(currentUser);

    return FloorsService.getFloor(currentUser, path.floor_id);
  }

  // # DELETE /api/rooms_objects/:floor_id
  @Delete("/api/rooms_objects/:floor_id")
  @ResponseSchema(OkResponse)
  async deleteFloor(
    @CurrentUser({ required: true }) currentUser: CurrentUserType,
    @Params({ required: true }) path: FloorsPathParams,
    @QueryParam("updated_at", { required: true }) updated_at: string
  ): Promise<OkResponse> {
    log.debug(currentUser);

    return FloorsService.deleteFloor(currentUser, path.floor_id, updated_at).then(() => ({
      ok: true,
    }));
  }
}
