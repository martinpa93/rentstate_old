import { Component, OnInit } from '@angular/core';
import { Tenant } from '../core/models/tenant';
import { mockTenants } from 'src/assets/mocks/tenants';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss']
})
export class TenantsComponent implements OnInit {

  tenants: Tenant[] = mockTenants;

  constructor() { }

  ngOnInit(): void {
  }

}
