import { Component } from '@angular/core';
import { RoomsService } from '../../../../data/services/rooms.service';
import { MatTableDataSource } from '@angular/material/table';
import { RoomsDetailed } from '../../../../data/types/Room';
import { DataType, FormActions } from '../../../../data/types/FormDialogData';
import { Reservation } from '../../../../data/types/Reservation';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
})
export class RoomsComponent {

  tableInfo = {
    roomId: {
      type: DataType.NUMBER,
      name: 'ID sobe',
    },
    roomCode: {
      type: DataType.STRING,
      name: 'Kod sobe',
    },
    roomFloor: {
      type: DataType.NUMBER,
      name: 'Kat sobe',
    },
    statusName: {
      type: DataType.STRING,
      name: 'Stanje sobe',
    },
    roomCategoryPrice: {
      type: DataType.CURRENCY,
      name: 'Cijena sobe',
    },
    roomBedCategoryName: {
      type: DataType.STRING,
      name: 'Kreveti',
    },
    roomQualityCategoryName: {
      type: DataType.STRING,
      name: 'Kategorija',
    },
  };
  tableKeys = Object.keys(this.tableInfo);
  dataType = DataType;
  formActions = FormActions;

  rooms$ = this.roomService.getRoomsDetailed();
  dataSource = new MatTableDataSource<RoomsDetailed>([]);

  constructor(
    private roomService: RoomsService,
    public dialog: MatDialog) {
    this.rooms$.subscribe(rooms => {
      this.dataSource.data = rooms;
    });
  }

  onInsertEntity(): void {
  }

  onUpdateEntity(reservation: Reservation): void {
  }

  onDeleteEntity(reservation: Reservation): void {
  }
}
