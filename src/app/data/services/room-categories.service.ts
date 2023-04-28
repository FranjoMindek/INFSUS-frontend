import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/ApiService';
import { RoomCategory } from '../types/RoomCategory';

@Injectable({
  providedIn: 'root',
})
export class RoomCategoriesService {

  constructor(private api: ApiService) {
  }

  // not really a codebook so I need a get
  getRoomCategories() {
    return this.api.get<RoomCategory[]>(`/room-categories`);
  }

  // insert or update if exists
  mergeRoomCategory(roomCategory: RoomCategory) {
    return this.api.put(`/room-categories/${roomCategory.roomCategoryId}`, roomCategory);
  }

  deleteRoomCategory(id: string) {
    return this.api.delete(`/room-categories/${id}`);
  }
}
