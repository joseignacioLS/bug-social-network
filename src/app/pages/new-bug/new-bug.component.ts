import { UserTrackerService } from './../../core/services/user-tracker.service';
import { INewBug } from './../../core/services/models/api.model';
import { Router } from '@angular/router';
import { ApiService } from './../../core/services/api.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-new-bug',
  templateUrl: './new-bug.component.html',
  styleUrls: ['./new-bug.component.scss'],
})
export class NewBugComponent implements OnInit {
  public newBugForm: FormGroup;

  constructor(
    private api: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userTracker: UserTrackerService
  ) {
    this.newBugForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: [''],
      location: ['']
    });
  }

  ngOnInit(): void {}

  public onSubmit(): void {
    if (this.userTracker.getUser() === "") {
      this.router.navigateByUrl("login")
      return
    }
    if (this.newBugForm.valid) {
      const  data: INewBug = this.newBugForm?.value
      this.api.createBug(data).subscribe((e) => {
        this.router.navigateByUrl('/list');
      });
    }
  }
}
