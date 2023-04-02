export type Reservation = {
  reservationId: number,
  clientId: number,
  roomId: number,
  reservationDateFrom?: Date,
  reservationDateTo?: Date,
  reservationStatusId?: number
}

export type ReservationDTO = {
  clientId: number,
  roomId: number,
  reservationDateFrom: Date,
  reservationDateTo: Date
}
