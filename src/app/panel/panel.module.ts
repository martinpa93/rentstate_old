import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './nav/nav.component';
import { RightNavComponent } from './right-nav/right-nav.component';
import { AddPropertyComponent } from './add/add-property/add-property.component';
import { AddTenantComponent } from './add/add-tenant/add-tenant.component';
import { AddContractComponent } from './add/add-contract/add-contract.component';
import { AddDocsComponent } from './add/add-docs/add-docs.component';
import { AddNoteComponent } from './add/add-note/add-note.component';
import { AddIncomeComponent } from './add/add-income/add-income.component';
import { AddOutgoingComponent } from './add/add-outgoing/add-outgoing.component';

const routes: Routes = [
  { path: '', redirectTo: 'panel' },
  {
    path: 'panel', component: PanelComponent,
    children: [
      { outlet: 'app', path: 'p', loadChildren: () =>  import('../properties/properties.module').then(m => m.PropertiesModule) },
      { outlet: 'app', path: 't', loadChildren: () =>  import('../tenants/tenants.module').then(m => m.TenantsModule) },
      { outlet: 'app', path: 'c', loadChildren: () =>  import('../contracts/contracts.module').then(m => m.ContractsModule) },
      { outlet: 'app', path: 'cont', loadChildren: () =>  import('../contability/contability.module').then(m => m.ContabilityModule) },
      { outlet: 'app', path: 'doc', loadChildren: () =>  import('../documents/documents.module').then(m => m.DocumentsModule) },
      { outlet: 'app', path: 'notes', loadChildren: () =>  import('../notes/notes.module').then(m => m.NotesModule) },
    ],
  }, 
];

@NgModule({
  declarations: [
    PanelComponent,
    NavComponent,
    RightNavComponent,
    AddPropertyComponent,
    AddTenantComponent,
    AddContractComponent,
    AddDocsComponent,
    AddNoteComponent,
    AddIncomeComponent,
    AddOutgoingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PanelModule { }
