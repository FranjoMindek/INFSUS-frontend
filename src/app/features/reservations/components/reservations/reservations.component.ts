import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Reservation, ReservationDTO } from '../../../../data/types/Reservation';
import { ReservationsService } from '../../../../data/services/reservations.service';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../../../../shared/components/form-dialog/form-dialog.component';
import { DataType, FormActions, FormDialogData } from '../../../../data/types/FormDialogData';
import { Validators } from '@angular/forms';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { filter, switchMap } from 'rxjs';
import { isNotUndefined } from '../../../../core/utilities/isNotUndefined';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent {

  tableInfo = {
    reservationId: {
      type: DataType.NUMBER,
      name: 'ID rezervacije',
    },
    clientId: {
      type: DataType.NUMBER,
      name: 'OIB klijenta',
    },
    roomId: {
      type: DataType.NUMBER,
      name: 'ID sobe',
    },
    reservationDateFrom: {
      type: DataType.DATE,
      name: 'Datum pocetka rezervacije',
    },
    reservationDateTo: {
      type: DataType.DATE,
      name: 'Datum kraja rezervacije',
    },
    reservationStatusId: {
      type: DataType.STRING,
      name: 'Status rezervacije',
    },
    actions: {
      type: DataType.ACTIONS,
      name: 'Akcije',
      values: [
        FormActions.INSERT,
        FormActions.UPDATE,
        FormActions.DELETE,
      ],
    },
  };
  tableKeys = Object.keys(this.tableInfo);
  dataType = DataType;
  formActions = FormActions;

  reservations$ = this.reservationsService.getReservations();
  dataSource = new MatTableDataSource<Reservation>([]);

  constructor(
    private reservationsService: ReservationsService,
    public dialog: MatDialog) {
    this.reservations$.subscribe(reservations => {
      this.dataSource.data = reservations;
    });
  }

  onInsertEntity(): void {
    const newEntityForm: FormDialogData = {
      title: 'Unesi novu rezervaciju',
      formInfo: [
        {
          name: 'clientId',
          type: DataType.NUMBER,
          validators: [Validators.required],
        },
        {
          name: 'roomId',
          type: DataType.NUMBER,
          validators: [Validators.required],
        },
        {
          name: 'reservationDateRange',
          type: DataType.DATE_RANGE,
          validators: [Validators.required],
          from: 'reservationDateFrom',
          to: 'reservationDateTo',
        },
      ],
    };

    this.dialog.open<FormDialogComponent, FormDialogData, ReservationDTO | undefined>(
      FormDialogComponent,
      {
        data: newEntityForm,
        maxWidth: '400px',
      },
    )
        .afterClosed()
        .pipe(
          filter(isNotUndefined),
          switchMap(result => this.reservationsService.insertReservations(result)),
          switchMap(() => this.reservationsService.getReservations()),
        )
        .subscribe(reservations => this.dataSource.data = reservations);
  }

  onUpdateEntity(reservation: Reservation): void {
    const updateEntityForm: FormDialogData = {
      title: `Uredi rezervaciju s ID-jem ${reservation.reservationId}`,
      formInfo: [
        {
          value: reservation.roomId,
          name: 'roomId',
          type: DataType.NUMBER,
          validators: [Validators.required],
        },
        {
          name: 'reservationDateRange',
          type: DataType.DATE_RANGE,
          validators: [Validators.required],
          from: 'reservationDateFrom',
          to: 'reservationDateTo',
          valueFrom: reservation.reservationDateFrom,
          valueTo: reservation.reservationDateTo,
        },
      ],
    };

    this.dialog.open<FormDialogComponent, FormDialogData, ReservationDTO | undefined>(
      FormDialogComponent,
      {
        data: updateEntityForm,
        maxWidth: '400px',
      },
    )
        .afterClosed()
        .pipe(
          filter(isNotUndefined),
          switchMap(result => this.reservationsService.updateReservation({...reservation, ...result})),
          switchMap(() => this.reservationsService.getReservations()),
        )
        .subscribe(reservations => this.dataSource.data = reservations);
  }

  onDeleteEntity(reservation: Reservation): void {
    this.dialog.open<ConfirmDialogComponent, {title: string}, any>(
      ConfirmDialogComponent,
      {
        data: {title: `Zelite li obrisati rezervaciju s ID-om ${reservation.reservationId}?`},
        maxWidth: '400px',
      },
    )
        .afterClosed()
        .pipe(
          filter(result => result),
          switchMap(() => this.reservationsService.deleteReservation(reservation.reservationId)),
          switchMap(() => this.reservationsService.getReservations()),
        )
        .subscribe(reservations => this.dataSource.data = reservations);
  }
}
