import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/ApiService';
import { OvernightStay, OvernightStayInsert } from '../types/OvernightStay';

@Injectable({
  providedIn: 'root',
})
export class OvernightStaysService {

  constructor(private api: ApiService) {
  }

  getOvernightStays() {
    return this.api.get<OvernightStay[]>(`/overnight-stays`);
  }

  getOvernightStayById(overnightStayId: number | string) {
    return this.api.get<OvernightStay>(`/overnight-stays/${overnightStayId}`);
  }

  insertOvernightStays(overnightStay: OvernightStayInsert) {
    return this.api.post(`/overnight-stays`, overnightStay);
  }

  updateOvernightStay(overnightStay: OvernightStay) {
    return this.api.put(`/overnight-stays/${overnightStay.overnightStayId}`, overnightStay);
  }

  deleteOvernightStay(overnightStayId: number | string) {
    return this.api.delete(`/overnight-stays/${overnightStayId}`);
  }

}
