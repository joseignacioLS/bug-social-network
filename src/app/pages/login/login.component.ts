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
  public password: string = "";
  public mode: string = "login"
  constructor(private router: Router, private userTracker: UserTrackerService) { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    if (this.mode === "login") {
      this.userTracker.login(this.username, this.password);
    }

    if (this.mode === "register") {
      this.userTracker.register(this.username, this.password)
    }
    // this.userTracker.setUser(this.username);
    // this.router.navigateByUrl("/list");
  }

  public onChangeMode(): void {
    this.mode = this.mode === "login"? "register": "login";
  }

}
