import { map, Observable, switchMap } from 'rxjs';
import { IBug } from './../../core/services/models/api.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from './../../core/services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public bug?: Observable<IBug>;
  private id: string = '0';

  public edit: boolean = false;

  public editBugForm: FormGroup;

  public user: string = 'jose';

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.editBugForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      location: ['', []],
      image: ['', []]
    });
  }

  ngOnInit(): void {
    this.updatePageInfo();
  }

  public updatePageInfo() {
    this.bug = this.route.params.pipe(
      switchMap((params) => {
        this.id = params['id'];
        return this.api.getBugById(this.id);
      }),
      map((bug) => {
        this.editBugForm.patchValue({
          name: bug.name,
          description: bug.description,
          location: bug.location,
          image: bug.image
        });
        return bug;
      })
    );
  }

  public onToggleEdit(): void {
    this.edit = !this.edit;
  }

  public onEdit(): void {
    if (this.bug && this.editBugForm?.valid) {
      this.api.modifyBug(this.id, this.editBugForm.value).subscribe((e) => {
        this.edit = false;
        this.updatePageInfo();
      });
    }
  }
  public onDelete(): void {
    if (this.bug) {
      this.api.deleteBug(this.id).subscribe((e) => {
        this.router.navigateByUrl('/mycreations');
      });
    }
  }
}
