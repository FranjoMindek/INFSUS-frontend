import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomQualityComponent } from './componnets/room-quality/room-quality.component';

const routes: Routes = [
  {
    path: 'room-quality',
    component: RoomQualityComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomQualityRoutingModule {}
