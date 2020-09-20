import { Component, OnDestroy, OnInit } from '@angular/core';
import { Tenant } from '../core/models/tenant';
import { Subscription } from 'rxjs';
import { TenantService } from '../core/services/tenant.service';
import { MatDialog } from '@angular/material/dialog';
import { FilterTenantsComponent } from './filter-tenants/filter-tenants.component';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss']
})
export class TenantsComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  tenants: Tenant[];
  tenantsPage: Tenant[];
  page = {
    pageIndex: 0,
    pageSize: 5
  };
  filter = {
    name: null,
    address: null, 
    type: null
  };
  sort: string;
  loadingR: boolean;

  constructor(
    private tenantS: TenantService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadingR = true;
    this.tenantS.listTenants().subscribe((res: Tenant[]) => {
      this.tenants = res;
      this.changeData();
      this.loadingR = false;
    });
    this.subscription.add(this.tenantS.addTenant(null, true).subscribe((res) => {
      this.loadingR = true;
      this.tenantS.listTenants(this.filter, this.sort).subscribe((res: Tenant[]) => {
        this.page.pageIndex = 0;
        this.tenants = res;
        this.changeData();
        this.loadingR = false;
      });
    }));
  }

  changePage(event) {
    this.page.pageIndex = event.pageIndex;
    this.page.pageSize = event.pageSize;
    this.changeData();
  }
  
  changeData() {
    if (!this.tenants) { return; }
    this.tenantsPage = this.tenants
      .filter((res: Tenant, index) => 
        index >= this.page.pageIndex * this.page.pageSize && index+1 <= (this.page.pageIndex+1) * this.page.pageSize
    );
  }

  openFilter() {
    const filter = { name: this.filter.name, address: this.filter.address, type: this.filter.type }
    const dialogRef = this.dialog.open(FilterTenantsComponent, { data: filter });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
        this.filter = result;
        this.filterData(this.filter, this.sort);
      }
    }); 
  }

  filterData(filter?, sort?) {
    this.tenantS.listTenants(filter, sort).subscribe((res: Tenant[]) => {
      this.page.pageIndex = 0;
      this.tenants = res;
      this.changeData();
    });
  }

  changeSort(filter, sort) {
    this.sort = sort;
    this.tenantS.listTenants(filter, sort).subscribe((res: Tenant[]) => {
      this.page.pageIndex = 0;
      this.tenants = res;
      this.changeData();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
