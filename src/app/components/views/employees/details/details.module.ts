import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { ListModule } from '../list/list.module';


@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    ListModule
  ]
})
export class DetailsModule { }
