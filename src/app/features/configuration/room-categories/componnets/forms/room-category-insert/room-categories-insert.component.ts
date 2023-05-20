import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CodebooksService } from '../../../../../../data/services/codebooks.service';
import { RoomCategory } from '../../../../../../data/types/RoomCategory';

@Component({
  selector: 'app-room-categories-insert',
  templateUrl: './room-categories-insert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomCategoriesInsertComponent {

  codebooks$ = this.codebooksService.getCodebooks('roomBedCategories', 'roomQualityCategories');

  form = this.fb.group({
    roomCategoryId: ['', Validators.required],
    roomCategoryName: ['', Validators.required],
    roomCategoryPrice: ['', Validators.required],
    roomBedCategoryId: ['', Validators.required],
    roomQualityCategoryId: ['', Validators.required],
  });

  constructor(
    private codebooksService: CodebooksService,
    private dialogRef: MatDialogRef<RoomCategoriesInsertComponent, RoomCategory>,
    private fb: FormBuilder,
  ) {}

  onConfirm() {
    if (!this.form.valid) return;

    this.dialogRef.close(this.form.value as RoomCategory);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
