import { NgModule } from '@angular/core';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { SharedModule } from '../../shared/shared.module';
import { ReservationsRoutingModule } from './reservations-routing.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ReservationsComponent,
  ],
  imports: [
    SharedModule,
    ReservationsRoutingModule,
    MatIconModule,
  ],
})
export class ReservationsModule {
}
