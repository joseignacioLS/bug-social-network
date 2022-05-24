import { FormsModule } from '@angular/forms';
import { SharedListComponent } from './components/sharedlist/sharedlist.component';

import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorPipe } from './pipes/paginator.pipe';
import { NameFilterPipe } from './pipes/name-filter.pipe';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    SharedListComponent,
    PaginatorPipe,
    NameFilterPipe,
    ButtonComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  providers: [PaginatorPipe, NameFilterPipe],
  exports: [SharedListComponent, ButtonComponent],
})
export class SharedModule {}
