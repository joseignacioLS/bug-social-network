import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserTrackerService } from './../../core/services/user-tracker.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public username: string = '';
  public password: string = '';
  public mode: string = 'login';
  public userForm: FormGroup;
  constructor(
    private userTracker: UserTrackerService,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.maxLength(12),
          Validators.minLength(4),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(12),
          Validators.minLength(4),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  public onSubmit(): void {
    if (this.userForm.valid) {
      const { username, password } = this.userForm.value;
      if (this.mode === 'login') {
        this.userTracker.login(username, password);
      }

      if (this.mode === 'register') {
        this.userTracker.register(username, password);
      }
    }
  }

  public onChangeMode(): void {
    this.mode = this.mode === 'login' ? 'register' : 'login';
  }
}
