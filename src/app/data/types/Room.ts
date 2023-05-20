import { RoomCategory } from './RoomCategory';

export type Room = {
  roomId: number,
  roomCode: string,
  roomFloor: number,
  roomStatusId: string,
  roomCategoryId: string,
}

export type RoomInsert = {
  roomCode: string,
  roomFloor: number,
  roomStatusId: string,
  roomCategoryId: string,
}

export type RoomsDetailed = {
  room: Room,
  roomCategory: RoomCategory
}

