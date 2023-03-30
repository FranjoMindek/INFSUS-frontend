import { NgModule } from '@angular/core';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { SharedModule } from '../../shared/shared.module';
import { ReservationsRoutingModule } from './reservations-routing.module';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    ReservationsComponent,
  ],
  imports: [
    SharedModule,
    ReservationsRoutingModule,
    MatTableModule,
  ],
})
export class ReservationsModule {
}
