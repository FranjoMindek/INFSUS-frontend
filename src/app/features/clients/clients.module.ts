import { NgModule } from '@angular/core';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './components/clients/clients.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    ClientsComponent
  ],
  imports: [
    SharedModule,
    ClientsRoutingModule
  ],
})
export class ClientsModule { }
