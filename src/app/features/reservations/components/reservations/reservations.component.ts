import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Reservation } from '../../../../data/types/Reservation';
import { ReservationsService } from '../../../../data/services/reservations.service';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../../../../shared/components/form-dialog/form-dialog.component';
import { FormDialogData, FormType } from '../../../../data/types/FormDialogData';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent
  implements OnInit {

  columnsInfo = [
    {
      name: 'reservationId',
      type: FormType.NUMBER,
    },
    {
      name: 'clientId',
      type: FormType.NUMBER,
    },
    {
      name: 'roomId',
      type: FormType.NUMBER,
    },
    {
      name: 'reservationDateFrom',
      type: FormType.DATE,
    },
    {
      name: 'reservationDateTo',
      type: FormType.DATE,
    },
    {
      name: 'reservationStatusId',
      type: FormType.NUMBER,
    },
  ];
  columnNames = this.columnsInfo.map(col => col.name);

  reservations$ = this.reservationsService.getReservations();
  dataSource = new MatTableDataSource<Reservation>([]);

  constructor(
    private reservationsService: ReservationsService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.reservations$.subscribe(reservations => {
      this.dataSource.data = reservations;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open<FormDialogComponent, FormDialogData, any>(
      FormDialogComponent,
      {
        data: {
          title: 'Unesi novu rezervaciju',
          columnsInfo: this.columnsInfo,
        },
        maxWidth: '400px',
      },
    );

    dialogRef.afterClosed()
             .subscribe(result => {
               console.log('The dialog was closed');
               console.log(result);
             });
  }
}
