import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CodebooksService } from '../../../../../../data/services/codebooks.service';
import { RoomCategory } from '../../../../../../data/types/RoomCategory';
import { FormType } from '../../../../../../data/types/UtilityTypes';

@Component({
  selector: 'app-room-categories-insert',
  templateUrl: './room-categories-insert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomCategoriesInsertComponent {

  codebooks$ = this.codebooksService.getCodebooks('roomBedCategories', 'roomQualityCategories');

  form: FormType<RoomCategory> = this.fb.group({
    roomCategoryId: new FormControl<string | null>(null, Validators.required),
    roomCategoryName: new FormControl<string | null>(null, Validators.required),
    roomCategoryPrice: new FormControl<number | null>(null, Validators.required),
    roomBedCategoryId: new FormControl<string | null>(null, Validators.required),
    roomQualityCategoryId: new FormControl<string | null>(null, Validators.required),
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
