export type Codebooks = Record<CodebookNames, CodebookData[]>;

export type CodebookData = {
  id: string,
  name: string
}
export type CodebookNames = 'clientIds'
                            | 'processes'
                            | 'overnightStayStatuses'
                            | 'reservationStatuses'
                            | 'rooms'
                            | 'readyRooms'
                            | 'roomStatuses'
                            | 'roomQualityCategories'
                            | 'roomBedCategories'

// export const enum Codebooks {
//   'clientIds',
//   'processes',
//   'overnightStayStatuses',
//   'reservationStatuses',
//   'rooms',
//   'readyRooms',
//   'roomStatuses',
//   'roomQualityCategories',
//   'roomBedCategories',
// }

export type RoomBedCategory = CodebookData;
export type RoomQualityCategory = CodebookData;
export type RoomStatus = CodebookData;
export type Process = CodebookData;
