import { UserTrackerService } from './../../../core/services/user-tracker.service';
import { IBug } from './../../../core/services/models/api.model';
import { Router } from '@angular/router';
import { ApiService } from './../../../core/services/api.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-bug-form',
  templateUrl: './bug-form.component.html',
  styleUrls: ['./bug-form.component.scss'],
})
export class BugFormComponent implements OnInit {
  public newBugForm?: FormGroup;
  @Input() public mode: string = 'create';
  @Input() public bug?: IBug;
  @Output() public editEmitter: EventEmitter<void> = new EventEmitter();

  constructor(
    private api: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userTracker: UserTrackerService
  ) {}

  ngOnInit(): void {
    if (this.mode === 'create') {
      this.newBugForm = this.formBuilder.group({
        name: new FormControl('', [
          Validators.required,
          Validators.maxLength(32),
        ]),
        description: new FormControl('', [
          Validators.required,
          Validators.maxLength(256),
        ]),
        image: new FormControl('', [Validators.required]),
        location: new FormControl(''),
        tags: new FormControl('', [
          Validators.pattern(/^[A-Za-z\-]{3,12}(?:,[A-Za-z\-]{3,12})*$/),
        ]),
      });
    } else {
      console.log('this!');
      this.newBugForm = this.formBuilder.group({
        name: new FormControl('', [
          Validators.required,
          Validators.maxLength(32),
        ]),
        description: new FormControl('', [
          Validators.required,
          Validators.maxLength(256),
        ]),
        location: new FormControl(''),
        tags: new FormControl('', [
          Validators.pattern(/^[A-Za-z\-]{3,12}(?:,[A-Za-z\-]{3,12})*$/),
        ]),
      });
    }

    if (this.mode === 'edit' && this.bug) {
      this.newBugForm.patchValue({
        name: this.bug.name,
        description: this.bug.description,
        location: this.bug.location,
        tags: this.bug.tags,
      });
    }
  }

  public onSubmit(): void {
    if (this.newBugForm?.valid) {
      if (this.mode === 'create') {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();

        const username = this.userTracker.getUser()?.username ?? '';

        const data: FormData = new FormData();

        data.append('name', this.newBugForm.value.name);
        data.append('description', this.newBugForm.value.description);
        data.append('location', this.newBugForm.value.location);
        data.append('tags', this.newBugForm.value.tags);
        data.append('user', username);
        data.append('createdAt', `${year}-${month}-${day}`);
        data.append('image', this.newBugForm.value.image ? this.newBugForm.value.image : '');

        this.api.createBug(data).subscribe((e) => {
          this.router.navigateByUrl('/mycreations');
        });
      } else if (this.mode === 'edit' && this.bug) {
        this.api
          .modifyBug(this.bug._id, this.newBugForm.value)
          .subscribe((e) => {
            this.editEmitter.emit();
          });
      }
    }
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.newBugForm?.patchValue({
        image: file,
      });
    }
  }
}
