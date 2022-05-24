import { AuthUserGuard } from './core/guards/auth-user.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { __importDefault } from 'tslib';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'list',
    loadChildren: () =>
      import('./pages/list/list.module').then((m) => m.ListModule),
    canActivate: [AuthUserGuard],
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'detail/:id',
    loadChildren: () =>
      import('./pages/detail/detail.module').then((m) => m.DetailModule),
    canActivate: [AuthUserGuard],
  },
  {
    path: 'newbug',
    loadChildren: () =>
      import('./pages/new-bug/new-bug.module').then((m) => m.NewBugModule),
    canActivate: [AuthUserGuard],
  },
  {
    path: 'mycreations',
    loadChildren: () =>
      import('./pages/my-creations/my-creations.module').then(
        (m) => m.MyCreationsModule
      ),
    canActivate: [AuthUserGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers:[AuthUserGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
