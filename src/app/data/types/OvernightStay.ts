export type OvernightStay = {
  overnightStayId: number,
  clientId: number,
  roomId: number,
  overnightStayDateFrom: Date,
  overnightStayDateTo: Date,
  overnightStayStatusId: number
}

export type OvernightStayDTO = {
  clientId: number,
  roomId: number,
  overnightStayDateFrom: Date,
  overnightStayDateTo: Date,
}
