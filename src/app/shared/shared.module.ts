import { ButtonModule } from './button/button.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedListComponent } from './components/sharedlist/sharedlist.component';
import { ListComponent } from './components/sharedlist/list/list.component';
import { ItemComponent } from './components/sharedlist/list/item/item.component';

import { BugFormComponent } from './components/bug-form/bug-form.component';
import { UserControlsComponent } from './components/sharedlist/user-controls/user-controls.component';

@NgModule({
  declarations: [
    SharedListComponent,
    ItemComponent,
    BugFormComponent,
    UserControlsComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  providers: [],
  exports: [SharedListComponent, BugFormComponent],
})
export class SharedModule {}
