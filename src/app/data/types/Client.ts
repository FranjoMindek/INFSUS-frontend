export type Client = {
  clientId: number,
  clientNationalId: string,
  clientPhoneNumber: string,
  clientFirstName: string,
  clientLastName: string
}

export type ClientInsert = {
  clientNationalId: string,
  clientPhoneNumber: string,
  clientFirstName: string,
  clientLastName: string
}

export type ClientUpdate = {
  clientId: number,
  clientFirstName: string,
  clientLastName: string,
  clientPhoneNumber: string,
}
