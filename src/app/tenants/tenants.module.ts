import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TenantsComponent } from './tenants.component';
import { FilterTenantsComponent } from './filter-tenants/filter-tenants.component';

const routes: Routes = [
  { path: '', component: TenantsComponent },
];

@NgModule({
  declarations: [
    TenantsComponent,
    FilterTenantsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
})
export class TenantsModule { }
