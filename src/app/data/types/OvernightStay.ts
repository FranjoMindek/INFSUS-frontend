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
  clientNationalId: string,
  clientFirstName: string,
  clientLastName: string,
  clientPhoneNumber: number,
  roomId: number,
  overnightStayDateFrom: Date,
  overnightStayDateTo: Date,
}

