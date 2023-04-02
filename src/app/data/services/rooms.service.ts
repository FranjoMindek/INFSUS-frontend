import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/ApiService';
import { Room } from '../types/Room';
import { RoomsDetailed } from '../types/RoomsDetailed';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {

  constructor(private api: ApiService) {
  }

  getRoomsDetailed() {
    return this.api.get<RoomsDetailed[]>(`/rooms`);
  }

  getRoomDetailedById(roomId: number | string) {
    return this.api.get<RoomsDetailed>(`/rooms/${roomId}`);
  }

  insertRoom(room: Room) {
    return this.api.post(`/rooms`, room);
  }

  updateRoom(room: Room) {
    return this.api.put(`/rooms/${room.roomId}`, room);
  }

  deleteRoom(roomId: number | string) {
    return this.api.delete(`/rooms/${roomId}`);
  }

}
