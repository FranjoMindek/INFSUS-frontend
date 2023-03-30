import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { OvernightStaysService } from '../../../../data/services/overnight-stays.service';
import { OvernightStay } from '../../../../data/types/OvernightStay';

@Component({
  selector: 'app-overnight-stays',
  templateUrl: './overnight-stays.component.html',
  styleUrls: ['./overnight-stays.component.css'],
})
export class OvernightStaysComponent
  implements OnInit {

  displayedColumns = [
    'overnightStayId', 'clientId', 'roomId', 'overnightStayDateFrom', 'overnightStayDateTo', 'overnightStayStatusId',
  ];
  overnightStays$ = this.overnightStaysService.getOvernightStays();
  dataSource = new MatTableDataSource<OvernightStay>([]);

  constructor(private overnightStaysService: OvernightStaysService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.overnightStays$.subscribe(overnightStays => {
      this.dataSource.data = overnightStays;
    });
  }
}
