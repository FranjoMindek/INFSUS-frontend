import { NgModule } from '@angular/core';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { SharedModule } from '../../shared/shared.module';
import { ReservationsRoutingModule } from './reservations-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { ReservationsInsertComponent } from './components/forms/reservations-insert/reservations-insert.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservationsUpdateComponent } from './components/forms/reservations-update/reservations-update.component';
import { CodebookPipe } from '../../shared/pipes/codebook.pipe';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    ReservationsComponent,
    ReservationsInsertComponent,
    ReservationsUpdateComponent,
  ],
  imports: [
    SharedModule,
    ReservationsRoutingModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    CodebookPipe,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
  ],
})
export class ReservationsModule {
}
