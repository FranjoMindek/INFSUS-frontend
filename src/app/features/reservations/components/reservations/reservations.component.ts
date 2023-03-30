import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../../../../data/types/Reservation';
import { ReservationsService } from '../../../../data/services/reservations.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent
  implements OnInit {

  displayedColumns = [
    'reservationId', 'clientId', 'roomId', 'reservationDateFrom', 'reservationDateTo', 'reservationStatusId',
  ];
  reservations$ = this.reservationsService.getReservations();
  dataSource = new MatTableDataSource<Reservation>([]);

  constructor(private reservationsService: ReservationsService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.reservations$.subscribe(reservations => {
      this.dataSource.data = reservations;
    });
  }
}
