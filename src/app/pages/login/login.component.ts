import { UserTrackerService } from './../../core/services/user-tracker.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username: string = "";
  constructor(private router: Router, private userTracker: UserTrackerService) { }

  ngOnInit(): void {
  }

  public onLogin(): void {
    this.userTracker.setUser(this.username);
    this.router.navigateByUrl("/list");
  }

}
