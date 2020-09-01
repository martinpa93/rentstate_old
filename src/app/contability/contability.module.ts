import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ContabilityComponent } from './contability.component';
import { ChartsModule } from 'ng2-charts';

const routes: Routes = [
  { path: '', component: ContabilityComponent },
];

@NgModule({
  declarations: [
    ContabilityComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ChartsModule
  ],
})
export class ContabilityModule { }
