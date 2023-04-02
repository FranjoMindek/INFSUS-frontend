import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoOpenMenuComponent } from './components/auto-open-menu/auto-open-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AutoOpenMenuComponent,
    FormDialogComponent,
    ConfirmDialogComponent,
  ],
  exports: [
    CommonModule,
    AutoOpenMenuComponent,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {
}
