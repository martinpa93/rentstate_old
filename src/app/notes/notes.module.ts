import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NotesComponent } from './notes.component';
import { FilterNotesComponent } from './filter-notes/filter-notes.component';

const routes: Routes = [
  { path: '', component: NotesComponent },
];

@NgModule({
  declarations: [
    NotesComponent,
    FilterNotesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
})
export class NotesModule { }
