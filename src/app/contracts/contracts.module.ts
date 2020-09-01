import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ContractsComponent } from './contracts.component';

const routes: Routes = [
  { path: '', component: ContractsComponent },
];

@NgModule({
  declarations: [
    ContractsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
})
export class ContractsModule { }
