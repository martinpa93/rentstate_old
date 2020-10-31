import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Property } from 'src/app/core/models/property';
import { Tenant } from 'src/app/core/models/tenant';
import { PropertyService } from 'src/app/core/services/property.service';
import { TenantService } from 'src/app/core/services/tenant.service';

@Component({
  selector: 'app-filter-contracts',
  templateUrl: './filter-contracts.component.html',
  styleUrls: ['./filter-contracts.component.scss']
})
export class FilterContractsComponent implements OnInit {

  properties: Property[];
  tenants: Tenant[];

  constructor(
    public dialogRef: MatDialogRef<FilterContractsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private propertyS: PropertyService,
    private tenantS: TenantService,
  ) { }

  ngOnInit(): void {
    this.propertyS.listProperties().subscribe((res) => {
      this.properties = res;
      
    });
    this.tenantS.listTenants().subscribe((res) => {
      this.tenants = res;
    });
  }

  onReset() {
    this.data = {};
  }

  onSubmit() {
    this.dialogRef.close(this.data);
  }

  compareSelect(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }

}
