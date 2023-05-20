import { ClientInsert } from './Client';

export type Reservation = {
  reservationId: number,
  clientId: number,
  roomId: number,
  reservationDateFrom?: Date,
  reservationDateTo?: Date,
  reservationStatusId?: number
}

export type ReservationUpdate = {
  clientId: number,
  roomId: number,
  reservationDateFrom: Date,
  reservationDateTo: Date
}

export type ReservationInsert = {
  clientInsert: ClientInsert,
  roomId: number,
  reservationDateFrom: Date,
  reservationDateTo: Date,
}

