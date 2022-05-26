import { ButtonModule } from './../../shared/button/button.module';
import { SharedModule } from './../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import { CardComponent } from './card/card.component';


@NgModule({
  declarations: [
    DetailComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    DetailRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    ButtonModule
  ]
})
export class DetailModule { }
