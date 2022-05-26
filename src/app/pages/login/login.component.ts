import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserTrackerService } from './../../core/services/user-tracker.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public username: string = '';
  public password: string = '';
  public mode: string = 'login';
  public userForm: FormGroup;

  public errorMessage: string = '';
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

  public onSubmit(): void {
    if (this.userForm.valid) {
      this.setErrorMessage('');
      const { username, password } = this.userForm.value;
      if (this.mode === 'login') {
        this.userTracker.login(username, password).subscribe({
          error: (err) => this.setErrorMessage('Login error'),
        });
      }

      if (this.mode === 'register') {
        this.userTracker.register(username, password).subscribe({
          error: (err) => this.setErrorMessage('Register error'),
        });
      }
    }
  }

  public onChangeMode(): void {
    this.setErrorMessage('');
    this.mode = this.mode === 'login' ? 'register' : 'login';
  }

  public setErrorMessage(message: string) {
    this.errorMessage = message;
  }
}
