import { Router } from '@angular/router';
import { UserTrackerService } from './../../services/user-tracker.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isMenuVisible: boolean = false;

  constructor(
    private userTracker: UserTrackerService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public isLogged() {
    return this.userTracker.getUser() !== null;
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
