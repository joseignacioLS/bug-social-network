import { SharedModule } from './../shared/shared.module';
import { UserTrackerService } from './services/user-tracker.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, HttpClientModule, SharedModule],
  providers: [UserTrackerService],
  exports: [HeaderComponent],
})
export class CoreModule {}
