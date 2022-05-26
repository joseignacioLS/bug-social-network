import { ButtonModule } from './button/button.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedListComponent } from './components/sharedlist/sharedlist.component';
import { ListComponent } from './components/sharedlist/list/list.component';
import { ItemComponent } from './components/sharedlist/list/item/item.component';

import { PaginatorPipe } from './pipes/paginator.pipe';
import { NameFilterPipe } from './pipes/name-filter.pipe';
import { BugFormComponent } from './components/bug-form/bug-form.component';
import { UserControlsComponent } from './components/sharedlist/user-controls/user-controls.component';

@NgModule({
  declarations: [
    SharedListComponent,
    PaginatorPipe,
    NameFilterPipe,
    ItemComponent,
    BugFormComponent,
    UserControlsComponent,
    ListComponent
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, ButtonModule],
  providers: [PaginatorPipe, NameFilterPipe],
  exports: [SharedListComponent, BugFormComponent],
})
export class SharedModule {}
