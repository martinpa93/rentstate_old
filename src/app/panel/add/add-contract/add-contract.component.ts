import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Contract } from 'src/app/core/models/contract';
import { Property } from 'src/app/core/models/property';
import { Tenant } from 'src/app/core/models/tenant';
import { ContractService } from 'src/app/core/services/contract.service';
import { PropertyService } from 'src/app/core/services/property.service';
import { TenantService } from 'src/app/core/services/tenant.service';

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.scss']
})
export class AddContractComponent implements OnInit {
 
  contract: Contract = {};
  properties: Property[];
  tenants: Tenant[];
  filterData = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  constructor(
    private contractS: ContractService,
    private propertyS: PropertyService,
    private tenantS: TenantService
  ) { }

  ngOnInit(): void {
    this.propertyS.listProperties().subscribe((res: Property[]) => {
      this.properties = res;
    });
    this.tenantS.listTenants().subscribe((res: Tenant[]) => {
      this.tenants = res;
    });
  }

  changeProperties(values) {
    this.contract.properties = [];
    values.forEach(element => {
      this.contract.properties.push(this.properties.find((p) => p.id === element));
    });
    this.contract.start = null;
    this.contract.end = null;

  }

  onSubmit() {
    console.log(this.contract);
  /*   this.contractS.addContract(this.contract, false).pipe(first()).subscribe((res) => {
      console.log(res);
    }); */
  }

}
