import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CodebooksService } from '../../../../../../data/services/codebooks.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomCategory } from '../../../../../../data/types/RoomCategory';

@Component({
  selector: 'app-room-categories-update',
  templateUrl: './room-categories-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomCategoriesUpdateComponent {

  codebooks$ = this.codebooksService.getCodebooks('roomBedCategories', 'roomQualityCategories');

  form = this.fb.group({
    roomCategoryId: [this.inputData.roomCategoryId, Validators.required],
    roomCategoryName: [this.inputData.roomCategoryName, Validators.required],
    roomCategoryPrice: [this.inputData.roomCategoryPrice, Validators.required],
    roomBedCategoryId: [this.inputData.roomBedCategoryId, Validators.required],
    roomQualityCategoryId: [this.inputData.roomQualityCategoryId, Validators.required],
  });

  constructor(
    private codebooksService: CodebooksService,
    @Inject(MAT_DIALOG_DATA) public inputData: RoomCategory,
    private dialogRef: MatDialogRef<RoomCategoriesUpdateComponent, RoomCategory>,
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
