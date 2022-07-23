import { FloorType } from "@prisma/client";
import { Type } from "class-transformer";
import {
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
  Post,
  Put,
  QueryParam,
  QueryParams,
} from "routing-controllers";
import { ResponseSchema } from "routing-controllers-openapi";
import log from "~/middlewares/log";
import { FloorsService } from "~/services/floors.service";
import { CurrentUserType } from "~/types";

// ::: REQUEST
export class FloorBody {
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

// ::: RESPONSE
class FloorResponse {
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

class ListFloorResponse extends FloorResponse {
  @ValidateNested({ each: true })
  @Type(() => FloorResponse)
  ancestors: FloorResponse[];
  @ValidateNested({ each: true })
  @Type(() => FloorResponse)
  children: FloorResponse[];
}

@JsonController()
export class FloorsController {
  // # POST /api/floors
  @Post("/api/floors")
  @ResponseSchema(FloorResponse)
  async postFloor(
    @CurrentUser({ required: true }) currentUser: CurrentUserType,
    @Body({ required: true }) body: FloorBody
  ): Promise<FloorResponse> {
    log.debug(currentUser, body);

    return FloorsService.postFloor(
      currentUser,
      {
        floortype: body.floortype,
        floorname: body.floorname,
      },
      body.parent_id
    );
  }

  // # GET /api/floors
  @Get("/api/floors")
  @ResponseSchema(ListFloorResponse)
  async getFloors(
    @CurrentUser({ required: true }) currentUser: CurrentUserType,
    @QueryParams() query: FloorsQuery
  ): Promise<ListFloorResponse> {
    log.debug(currentUser, query);

    return FloorsService.getFloors(query);
  }

  // # PUT /api/floors/:floor_id
  @Put("/api/floors/:floor_id")
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

  // # GET /api/floors/:floor_id
  @Get("/api/floors/:floor_id")
  @ResponseSchema(FloorResponse)
  async getFloor(
    @CurrentUser({ required: true }) currentUser: CurrentUserType,
    @Params({ required: true }) path: FloorsPathParams
  ): Promise<FloorResponse> {
    log.debug(currentUser);

    return FloorsService.getFloor(currentUser, path.floor_id);
  }

  // # DELETE /api/floors/:floor_id
  @Delete("/api/floors/:floor_id")
  @ResponseSchema(FloorResponse)
  async deleteFloor(
    @CurrentUser({ required: true }) currentUser: CurrentUserType,
    @Params({ required: true }) path: FloorsPathParams,
    @QueryParam("updated_at", { required: true }) updated_at: string
  ): Promise<FloorResponse> {
    log.debug(currentUser);

    return FloorsService.deleteFloor(currentUser, path.floor_id, updated_at);
  }
}
