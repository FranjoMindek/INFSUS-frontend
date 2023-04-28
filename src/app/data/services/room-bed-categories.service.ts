import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/ApiService';
import { CodebookData } from '../types/Codebooks';

@Injectable({
  providedIn: 'root',
})
export class RoomBedCategoriesService {

  constructor(private api: ApiService) {
  }

  insertRoomBedCategory(roomBedCategory: CodebookData) {
    return this.api.put(`/room-bed-categories/${roomBedCategory.id}`, roomBedCategory);
  }

  deleteRoomBedCategory(id: string) {
    return this.api.delete(`/room-bed-categories/${id}`);
  }
}
