import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDTO } from './dto/createRoom';
import { Response } from 'express';
import { AuthorizeJWT } from '../../common/guards/authorizeJWT';
import { extractIdRoom } from '../../common/utils/helper';
import { IdUser } from '../../common/decorators/idUser';
import { RoomUserService } from '../room-user/roomUser.service';
import { Room } from './room.entity';

@Controller('rooms')
export class RoomController {
  constructor(
    private roomService: RoomService,
    private logger: Logger = new Logger(RoomController.name),
    private roomUserService: RoomUserService,
  ) {}

  @UseGuards(AuthorizeJWT)
  @Get()
  async getRooms(
    @Query('theme') theme: string,
    @Query('language_code') language_code: string,
    @Query('search') search: string,
    @Res() response: Response,
  ) {
    try {
      let rooms = await this.roomService.getRoomsByQuery(theme, language_code);

      rooms = rooms.map((room: any) => {
        room = {
          id: room.id,
          thumbnail: room.thumbnail,
          theme_name: room.words_collection.theme.name,
          code_room: room.code_room,
          number_of_participants: room.participants.length,
          max_player: room.max_player,
          language: room.language.code,
          current_round: room.room_round?.current_round || 1,
          number_of_round: room.number_of_round,
          is_public: room.is_public,
          created_at: room.created_at,
          updated_at: room.updated_at,
        };
        return room;
      });

      rooms = rooms.filter((room: any) => {
        const themeNameContainSearch = room.theme_name
          .toLowerCase()
          .includes(search.toLowerCase());
        const codeRoomContainSearch = room.code_room
          .toLowerCase()
          .includes(search.toLowerCase());
        const languageContainSearch = room.language
          .toLowerCase()
          .includes(search.toLowerCase());
        return (
          themeNameContainSearch ||
          codeRoomContainSearch ||
          languageContainSearch
        );
      });

      return response.status(HttpStatus.OK).json(rooms);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @UseGuards(AuthorizeJWT)
  @Post()
  async createRoom(
    @Body(new ValidationPipe()) roomInformation: CreateRoomDTO,
    @Res() response: Response,
    @IdUser() idUser: number,
  ) {
    try {
      const newRoom: Room = await this.roomService.createNewRoom({
        ...roomInformation,
        host_id: idUser,
      });

      return response.status(HttpStatus.OK).json(newRoom);
    } catch (error) {
      this.logger.error(error);
      return response.status(error.status).json(error);
    }
  }

  @UseGuards(AuthorizeJWT)
  @Get('/quick-play')
  async getRoomQuickPlay(@Res() response: Response) {
    try {
      const room = await this.roomService.randomRoomForQuickPlay();

      return response.status(HttpStatus.OK).json(room);
    } catch (error) {
      this.logger.error(error);
      return response.status(error.status).json(error);
    }
  }

  @UseGuards(AuthorizeJWT)
  @Get('/:codeRoom')
  async getRoom(
    @Param('codeRoom') codeRoom: string,
    @Res() response: Response,
  ) {
    try {
      const room: Room = await this.roomService.getRoomByCodeRoom(codeRoom);

      return response.status(HttpStatus.OK).json(room);
    } catch (error) {
      this.logger.error(error);
      return response.status(error.status).json(error);
    }
  }

  @UseGuards(AuthorizeJWT)
  @Get('/participants/:codeRoom')
  async getListUserOfRoom(
    @Param('codeRoom') codeRoom: string,
    @Res() response: Response,
  ) {
    try {
      const room: Room = await this.roomService.getRoomByCodeRoom(codeRoom);
      const users = await this.roomUserService.getListUserOfRoom(room);

      return response.status(HttpStatus.OK).json({
        participants: users,
        max_player: room.max_player,
      });
    } catch (error) {
      this.logger.error(error);
      return response.status(error.status).json(error);
    }
  }
}
