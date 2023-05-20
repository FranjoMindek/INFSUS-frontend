import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientsService } from '../../../../data/services/clients.service';
import { Client, ClientUpdate } from '../../../../data/types/Client';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs';
import { CodebooksService } from '../../../../data/services/codebooks.service';
import { ClientsUpdateComponent } from '../forms/clients-update/clients-update.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
})
export class ClientsComponent {
  displayedColumns = [
    'clientId', 'clientNationalId', 'clientPhoneNumber', 'clientFirstName', 'clientLastName', 'actions',
  ];

  clients$ = this.clientService.getClients();
  dataSource = new MatTableDataSource<Client>([]);

  constructor(
    private clientService: ClientsService,
    public dialog: MatDialog,
    public codebooksService: CodebooksService,
  ) {
    this.clients$.subscribe(clients =>
      this.dataSource.data = clients,
    );
  }

  onUpdateEntity(client: Client): void {
    this.dialog.open<ClientsUpdateComponent, Client, ClientUpdate | undefined>(
      ClientsUpdateComponent,
      {
        data: client,
        maxWidth: '400px',
      },
    )
        .afterClosed()
        .pipe(
          filter(client => !!client),
          switchMap(result => this.clientService.updateClient(client)),
          switchMap(() => this.clientService.getClients()),
        )
        .subscribe(reservations => this.dataSource.data = reservations);
  }
}
