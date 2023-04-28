import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Reservation, ReservationInsert, ReservationUpdate } from '../../../../data/types/Reservation';
import { ReservationsService } from '../../../../data/services/reservations.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { filter, switchMap } from 'rxjs';
import { isNotUndefined } from '../../../../core/utilities/isNotUndefined';
import { CodebooksService } from '../../../../data/services/codebooks.service';
import { ReservationsInsertComponent } from '../forms/reservations-insert/reservations-insert.component';
import { ReservationsUpdateComponent } from '../forms/reservations-update/reservations-update.component';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
})
export class ReservationsComponent {
  displayedColumns = [
    'reservationId', 'clientId', 'roomId', 'reservationDateFrom', 'reservationDateTo', 'reservationStatusId', 'actions',
  ];

  reservations$ = this.reservationsService.getReservations();
  codebooks$ = this.codebookService.getCodebooks('rooms', 'reservationStatuses');
  dataSource: MatTableDataSource<Reservation> = new MatTableDataSource<Reservation>([]);

  constructor(
    private reservationsService: ReservationsService,
    private dialog: MatDialog,
    private codebookService: CodebooksService,
  ) {
    this.reservations$.subscribe(
      reservations => this.dataSource.data = reservations,
    );
  }

  onInsertEntity(): void {
    this.dialog.open<ReservationsInsertComponent, null, ReservationInsert | undefined>(
      ReservationsInsertComponent,
      {
        maxWidth: '400px',
      })
        .afterClosed()
        .pipe(
          filter(isNotUndefined),
          switchMap(result => this.reservationsService.insertReservations(result)),
          switchMap(() => this.reservationsService.getReservations()),
        )
        .subscribe(reservations => this.dataSource.data = reservations);
  }

  onUpdateEntity(reservation: Reservation): void {
    this.dialog.open<ReservationsUpdateComponent, Reservation, ReservationUpdate | undefined>(
      ReservationsUpdateComponent,
      {
        data: reservation,
        maxWidth: '400px',
      })
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
