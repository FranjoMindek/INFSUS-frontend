import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { RoomsComponent } from './components/rooms/rooms.component';
import {SharedModule} from "../../shared/shared.module";
import {MatTableModule} from "@angular/material/table";

const routes: Routes = [
  {
    path: 'rooms',
    component: RoomsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    MatTableModule
  ],
  exports: [RouterModule],
  declarations: [
    RoomsComponent
  ]
})
export class RoomsModule { }
