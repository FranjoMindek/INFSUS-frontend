import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-room-bed-categories-insert',
  templateUrl: './room-bed-categories-insert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomBedCategoriesInsertComponent {

  form = this.fb.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
  });

  constructor(
    private dialogRef: MatDialogRef<RoomBedCategoriesInsertComponent>,
    private fb: FormBuilder,
  ) {}

  onConfirm() {
    if (!this.form.valid) return;

    this.dialogRef.close(this.form.value);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
