import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-room-quality-categories-categories-insert',
  templateUrl: './room-quality-categories-insert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomQualityCategoriesInsertComponent {

  form = this.fb.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
  });

  constructor(
    private dialogRef: MatDialogRef<RoomQualityCategoriesInsertComponent>,
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
