import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserGuard } from './core/services/user.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'panel', loadChildren: () => import('./panel/panel.module').then(m => m.PanelModule)},
  { path: 'c', loadChildren: () =>  import('./contability/contability.module').then(m => m.ContabilityModule) },
  { path: 'd', loadChildren: () =>  import('./documents/documents.module').then(m => m.DocumentsModule) },
  { path: '',  redirectTo: 'panel', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
