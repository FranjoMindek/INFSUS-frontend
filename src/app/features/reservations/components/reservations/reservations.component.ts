import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Reservation } from '../../../../data/types/Reservation';
import { ReservationsService } from '../../../../data/services/reservations.service';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../../../../shared/components/form-dialog/form-dialog.component';
import { FormActions, FormDialogData, FormType } from '../../../../data/types/FormDialogData';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent
  implements OnInit {

  displayedColumns = [
    'reservationId',
    'clientId',
    'roomId',
    'reservationDateFrom',
    'reservationDateTo',
    'reservationStatusId',
  ];
  displayedColumnsWithActions = [...this.displayedColumns, 'actions'];
  actions = [
    FormActions.INSERT,
    FormActions.UPDATE,
    FormActions.DELETE,
  ];
  formActions = FormActions;
  reservations$ = this.reservationsService.getReservations();
  dataSource = new MatTableDataSource<Reservation>([]);

  newEntityForm: FormDialogData = {
    title: 'Unesi novu rezervaciju',
    formInfo: [
      {
        name: 'clientId',
        type: FormType.NUMBER,
        validators: [Validators.required],
      },
      {
        name: 'roomId',
        type: FormType.NUMBER,
        validators: [Validators.required],
      },
      {
        name: 'reservationDateRange',
        type: FormType.DATE_RANGE,
        validators: [Validators.required],
      },
    ],
  };

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
        data: this.newEntityForm,
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
