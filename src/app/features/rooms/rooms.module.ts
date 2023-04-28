import { NgModule } from '@angular/core';
import { RoomsComponent } from './components/rooms/rooms.component';
import { SharedModule } from '../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { RoomsRoutingModule } from './rooms-routing.module';
import { DatePipe, KeyValuePipe, NgForOf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';


@NgModule({
  declarations: [
    RoomsComponent,
  ],
  imports: [
    SharedModule,
    RoomsRoutingModule,
    MatTableModule,
    NgSwitch,
    DatePipe,
    NgSwitchCase,
    NgSwitchDefault,
    NgForOf,
    KeyValuePipe,
  ],
})
export class RoomsModule {
}
