import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/ApiService';
import { Reservation } from '../types/Reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  constructor(private api: ApiService) {
  }

  getReservations() {
    return this.api.get<Reservation[]>(`/reservations`);
  }

  getReservationById(reservationId: number | string) {
    return this.api.get<Reservation>(`/reservations/${reservationId}`);
  }

  updateReservation(reservation: Reservation) {
    return this.api.put(`/reservations/${reservation.reservationId}`, reservation);
  }

  deleteReservation(reservation: number | string) {
    return this.api.delete(`/reservations/${reservation}`);
  }

}
