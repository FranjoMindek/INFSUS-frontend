import { NgModule } from '@angular/core';
import { OvernightStaysComponent } from './components/overnight-stays/overnight-stays.component';
import { SharedModule } from '../../shared/shared.module';
import { OvernightStaysRoutingModule } from './overnight-stays-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {
  OvernightStaysInsertComponent,
} from './components/forms/overnight-stays-insert/overnight-stays-insert.component';
import {
  OvernightStaysUpdateComponent,
} from './components/forms/overnight-stays-update/overnight-stays-update.component';
import { CodebookPipe } from '../../shared/pipes/codebook.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    OvernightStaysComponent,
    OvernightStaysInsertComponent,
    OvernightStaysUpdateComponent,
  ],
  imports: [
    SharedModule,
    OvernightStaysRoutingModule,
    MatTableModule,
    MatIconModule,
    CodebookPipe,
    MatDatepickerModule,
    MatSelectModule,
    ReactiveFormsModule,
    DatePipe,
    AsyncPipe,
    MatButtonModule,
    NgIf,
    MatDialogModule,
    NgForOf,
    MatInputModule,
  ],
})
export class OvernightStaysModule {
}
