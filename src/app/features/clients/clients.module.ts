import { NgModule } from '@angular/core';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './components/clients/clients.component';
import { SharedModule } from '../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ClientsComponent,
  ],
  imports: [
    SharedModule,
    ClientsRoutingModule,
    MatTableModule,
    MatIconModule,
  ],
})
export class ClientsModule {
}
