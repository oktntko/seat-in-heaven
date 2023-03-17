import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { Get, JsonController, QueryParams } from "routing-controllers";
import { ResponseSchema } from "routing-controllers-openapi";
import { FloorResponse } from "~/controllers/api/floors.controller";
import log from "~/middlewares/log";
import { RoomsService } from "~/services/rooms.service";

// ::: REQUEST
export class RoomsQuery {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  keyword?: string;
}

// ::: RESPONSE
class RoomResponse extends FloorResponse {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FloorResponse)
  ancestors: FloorResponse[];
}
class ListRoomResponse {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoomResponse)
  rooms: RoomResponse[];
}

@JsonController()
export class RoomsController {
  // # GET /api/rooms
  @Get("/api/rooms")
  @ResponseSchema(ListRoomResponse)
  async getRooms(@QueryParams() query: RoomsQuery): Promise<ListRoomResponse> {
    log.debug(query);

    return RoomsService.getRooms(query);
  }
}
