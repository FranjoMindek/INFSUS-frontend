import { NgModule } from '@angular/core';
import { OvernightStaysComponent } from './components/overnight-stays/overnight-stays.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {OvernightStaysRoutingModule} from "./overnight-stays-routing.module";



@NgModule({
  declarations: [
    OvernightStaysComponent
  ],
  imports: [
    SharedModule,
    OvernightStaysRoutingModule
  ],
})
export class OvernightStaysModule { }
