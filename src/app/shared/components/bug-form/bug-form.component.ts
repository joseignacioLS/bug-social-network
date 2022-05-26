import { INewBug, IBug } from './../../../core/services/models/api.model';
import { Router } from '@angular/router';
import { ApiService } from './../../../core/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-bug-form',
  templateUrl: './bug-form.component.html',
  styleUrls: ['./bug-form.component.scss'],
})
export class BugFormComponent implements OnInit {
  public newBugForm: FormGroup;
  @Input() public mode: string = 'create';
  @Input() public bug?: IBug;
  @Output() public editEmitter: EventEmitter<void> = new EventEmitter();

  constructor(
    private api: ApiService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.newBugForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(32)]],
      description: ['', [Validators.required, Validators.maxLength(256)]],
      image: [''],
      location: [''],
      tags: ['', [Validators.pattern(/^[A-Za-z\-]{3,12}(?:,[A-Za-z\-]{3,12})*$/)]],
    });
  }

  ngOnInit(): void {
    if (this.mode === "edit" && this.bug) {
      this.newBugForm.patchValue({
        name: this.bug.name,
        description: this.bug.description,
        image: this.bug.image,
        location: this.bug.location,
        tags: this.bug.tags
      });

    }
  }

  public onSubmit(): void {
    if (this.newBugForm.valid) {
      const data: INewBug = this.newBugForm?.value;
      if (this.mode === 'create') {
        this.api.createBug(data).subscribe((e) => {
          this.router.navigateByUrl('/mycreations');
        });
      } else if (this.mode === 'edit' && this.bug) {
        this.api.modifyBug(this.bug._id, data).subscribe((e) => {
          this.editEmitter.emit()
        });
      }
    }
  }
}

