import { NgModule } from '@angular/core';
import { RoomsComponent } from './components/rooms/rooms.component';
import { SharedModule } from '../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { RoomsRoutingModule } from './rooms-routing.module';


@NgModule({
  declarations: [
    RoomsComponent,
  ],
  imports: [
    SharedModule,
    RoomsRoutingModule,
    MatTableModule,
  ],
})
export class RoomsModule {
}
