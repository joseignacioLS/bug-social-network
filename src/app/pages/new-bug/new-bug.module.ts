import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewBugRoutingModule } from './new-bug-routing.module';
import { NewBugComponent } from './new-bug.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NewBugComponent
  ],
  imports: [
    CommonModule,
    NewBugRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NewBugModule { }
