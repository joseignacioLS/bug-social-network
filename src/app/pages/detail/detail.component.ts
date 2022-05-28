import { UserTrackerService } from './../../core/services/user-tracker.service';
import { map, Observable, switchMap } from 'rxjs';
import { IBug } from './../../core/services/models/api.model';
import { ApiService } from './../../core/services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public bug$?: Observable<IBug>;

  private id: string = '0';

  public edit: boolean = false;

  public canEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private userTracker: UserTrackerService
  ) {}

  ngOnInit(): void {
    this.updatePageInfo();
    this.bug$?.subscribe((bug: IBug) => {
      this.canEdit = bug.user === this.userTracker.getUser()?.username;
    });
  }

  public updatePageInfo() {
    this.bug$ = this.route.params.pipe(
      switchMap((params) => {
        this.id = params['id'];
        return this.api.getBugById(this.id);
      })
    );
  }

  public onToggleEdit(): void {
    this.edit = !this.edit;
  }

  public onDelete(): void {
    if (this.bug$) {
      this.api.deleteBug(this.id).subscribe((e) => {
        this.router.navigateByUrl('/mycreations');
      });
    }
  }

  public onStopEditting() {
    this.updatePageInfo();
    this.edit = false;
  }
}
