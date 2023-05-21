import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/ApiService';
import { Room, RoomsDetailed } from '../types/Room';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {

  constructor(private api: ApiService) {
  }

  getDetailedRooms() {
    return this.api.get<RoomsDetailed[]>(`/detailed-rooms`);
  }

  getDetailedRoomsById(roomId: number | string) {
    return this.api.get<RoomsDetailed>(`/detailed-rooms/${roomId}`);
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
