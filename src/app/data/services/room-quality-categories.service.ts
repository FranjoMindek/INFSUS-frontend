import { Injectable } from '@angular/core';
import { CodebookData } from '../types/Codebooks';
import { ApiService } from '../../core/services/ApiService';

@Injectable({
  providedIn: 'root'
})
export class RoomQualityCategoriesService {

  constructor(private api: ApiService) {
  }

  insertRoomQualityCategory(roomQualityCategory: CodebookData) {
    return this.api.put(`/room-quality-categories/${roomQualityCategory.id}`, roomQualityCategory);
  }

  deleteRoomQualityCategory(id: string) {
    return this.api.delete(`/room-quality-categories/${id}`);
  }
}
