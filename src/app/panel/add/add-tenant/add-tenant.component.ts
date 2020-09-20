import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Tenant } from 'src/app/core/models/tenant';
import { TenantService } from 'src/app/core/services/tenant.service';

@Component({
  selector: 'app-add-tenant',
  templateUrl: './add-tenant.component.html',
  styleUrls: ['./add-tenant.component.scss']
})
export class AddTenantComponent implements OnInit {

  tenant: Tenant = {type: 'private', country: 'españa'};
  tenants: Tenant[];

  constructor(
    private tenantS: TenantService
  ) { }

  ngOnInit(): void {
    this.tenantS.listTenants().subscribe((t) => {
      this.tenants = t;
    });
  }

  changeType(type) {
    if(type === 'private') {
      delete this.tenant.tenantId;
    }
  }

  onSubmit() {
    this.tenantS.addTenant(this.tenant, false).pipe(first()).subscribe((res) => {
      console.log(res);
    });
  }

}
