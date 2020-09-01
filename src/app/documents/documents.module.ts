import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DocumentsComponent } from './documents.component';

const routes: Routes = [
  { path: '', component: DocumentsComponent },
];

@NgModule({
  declarations: [
    DocumentsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class DocumentsModule { }
