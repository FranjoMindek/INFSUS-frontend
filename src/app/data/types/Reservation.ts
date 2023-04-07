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
  clientNationalId: string,
  clientFirstName: string,
  clientLastName: string,
  clientPhoneNumber: number,
  roomId: number,
  reservationDateFrom: Date,
  reservationDateTo: Date,
}

