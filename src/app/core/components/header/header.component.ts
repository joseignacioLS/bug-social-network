import { NavigationEnd, Router } from '@angular/router';
import { UserTrackerService } from './../../services/user-tracker.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isMenuVisible: boolean = false;
  private userSubscription?: Subscription;
  public isLogged: boolean = false;

  constructor(
    private userTracker: UserTrackerService,
    private router: Router,
    private userTrackerService: UserTrackerService
  ) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.isMenuVisible = false;
      }
    });
  }

  ngOnInit(): void {
    this.userSubscription = this.userTrackerService.isLogged$.subscribe((value) => {
      this.isLogged = value;
    });
  }

  public logout() {
    this.isMenuVisible = false;
    this.userTracker.logout();
    this.router.navigateByUrl('');
  }

  public onToggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
}
