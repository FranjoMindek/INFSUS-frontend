import { NgModule } from '@angular/core';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './components/clients/clients.component';
import { SharedModule } from '../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ClientsUpdateComponent } from './components/forms/clients-update/clients-update.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClientsComponent,
    ClientsUpdateComponent,
  ],
  imports: [
    SharedModule,
    ClientsRoutingModule,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
})
export class ClientsModule {
}
