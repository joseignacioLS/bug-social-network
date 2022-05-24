import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCreationsRoutingModule } from './my-creations-routing.module';
import { MyCreationsComponent } from './my-creations.component';


@NgModule({
  declarations: [
    MyCreationsComponent
  ],
  imports: [
    CommonModule,
    MyCreationsRoutingModule,
    SharedModule
  ]
})
export class MyCreationsModule { }
