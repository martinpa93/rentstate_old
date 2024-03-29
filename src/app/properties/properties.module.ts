import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PropertiesComponent } from './properties.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { FilterPropertiesComponent } from './filter-properties/filter-properties.component';

const routes: Routes = [
  { path: '', component: PropertiesComponent },
  { path: 'p/:id',  component: EditPropertyComponent}
];

@NgModule({
  declarations: [
    PropertiesComponent,
    EditPropertyComponent,
    FilterPropertiesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
})
export class PropertiesModule { }
