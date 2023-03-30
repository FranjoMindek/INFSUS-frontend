import { NgModule } from '@angular/core';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { SharedModule } from '../../shared/shared.module';
import { ReservationsRoutingModule } from './reservations-routing.module';


@NgModule({
  declarations: [
    ReservationsComponent,
  ],
  imports: [
    SharedModule,
    ReservationsRoutingModule,
  ],
})
export class ReservationsModule {
}
