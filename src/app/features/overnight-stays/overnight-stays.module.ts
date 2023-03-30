import { NgModule } from '@angular/core';
import { OvernightStaysComponent } from './components/overnight-stays/overnight-stays.component';
import { SharedModule } from '../../shared/shared.module';
import { OvernightStaysRoutingModule } from './overnight-stays-routing.module';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    OvernightStaysComponent,
  ],
  imports: [
    SharedModule,
    OvernightStaysRoutingModule,
    MatTableModule,
  ],
})
export class OvernightStaysModule {
}
