import { NgModule } from '@angular/core';
import { RoomsComponent } from './components/rooms/rooms.component';
import { SharedModule } from '../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { RoomsRoutingModule } from './rooms-routing.module';
import {
  AsyncPipe,
  CurrencyPipe,
  DatePipe,
  KeyValuePipe,
  NgForOf,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
} from '@angular/common';
import { CodebookPipe } from '../../shared/pipes/codebook.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


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
    AsyncPipe,
    CodebookPipe,
    MatButtonModule,
    MatIconModule,
    NgIf,
    CurrencyPipe,
  ],
})
export class RoomsModule {
}
