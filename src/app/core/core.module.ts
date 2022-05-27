import { ListControlsService } from './services/list-controls.service';
import { ButtonModule } from './../shared/button/button.module';

import { ExitGuardGuard } from './guards/exit-guard.guard';
import { AuthUserGuard } from './guards/auth-user.guard';
import { UserTrackerService } from './services/user-tracker.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, HttpClientModule, ButtonModule],
  providers: [
    UserTrackerService,
    AuthUserGuard,
    ExitGuardGuard,
    ListControlsService,
  ],
  exports: [HeaderComponent],
})
export class CoreModule {}
