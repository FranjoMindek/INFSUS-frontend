import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientsService } from '../../../../data/services/clients.service';
import { HttpClient } from '@angular/common/http';
import { Client } from '../../../../data/types/Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent
  implements OnInit {

  displayedColumns = [
    'clientId', 'clientFirstName', 'clientLastName',
  ];
  clients$ = this.clientsService.getClients();
  dataSource = new MatTableDataSource<Client>([]);

  constructor(private clientsService: ClientsService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.clients$.subscribe(clients => {
      this.dataSource.data = clients;
    });
  }

}
