import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {OvernightStaysComponent} from "./components/overnight-stays/overnight-stays.component";

const routes: Routes = [
  {
    path: 'overnight-stays',
    component: OvernightStaysComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OvernightStaysRoutingModule { }
