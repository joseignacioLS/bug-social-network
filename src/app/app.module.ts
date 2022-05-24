import { UserTrackerService } from './core/services/user-tracker.service';
import { ApiService } from './core/services/api.service';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, RouterModule, CoreModule],
  providers: [ApiService, UserTrackerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
