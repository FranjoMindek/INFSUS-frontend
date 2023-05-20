import { ClientInsert } from './Client';

export type OvernightStay = {
  overnightStayId: number,
  clientId: number,
  roomId: number,
  overnightStayDateFrom?: Date,
  overnightStayDateTo?: Date,
  overnightStayStatusId?: number
}

export type OvernightStayUpdate = {
  clientId: number,
  roomId: number,
  overnightStayDateFrom: Date,
  overnightStayDateTo: Date
}

export type OvernightStayInsert = {
  clientInsert: ClientInsert,
  roomId: number,
  overnightStayDateFrom: Date,
  overnightStayDateTo: Date,
}

