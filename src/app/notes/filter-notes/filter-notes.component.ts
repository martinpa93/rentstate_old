import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContractService } from '../../core/services/contract.service';
import { PropertyService } from '../../core/services/property.service';
import { TenantService } from '../../core/services/tenant.service';

@Component({
  selector: 'app-filter-notes',
  templateUrl: './filter-notes.component.html',
  styleUrls: ['./filter-notes.component.scss']
})
export class FilterNotesComponent implements OnInit {

  listRel = [];

  constructor(
    public dialogRef: MatDialogRef<FilterNotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private propertyS: PropertyService,
    private tenantS: TenantService,
    private contractS: ContractService
  ) { }

  ngOnInit(): void {
    this.propertyS.listProperties().subscribe((res) => {
      this.listRel.push({group: 'property', rel: []});
      res.forEach((ele) => {
        this.listRel[0].rel.push(ele);
      });
    });
    this.tenantS.listTenants().subscribe((res) => {
      this.listRel.push({group: 'tenant', rel: []});
      res.forEach((ele) => {
        this.listRel[1].rel.push(ele);
      });
    });
    this.contractS.listContracts().subscribe((res) => {
      this.listRel.push({group: 'contract', rel: []});
      res.forEach((ele) => {
        this.listRel[2].rel.push(ele);
      });
    });
  }

  onReset() {
    this.data = {};
  }

  onSubmit() {
    this.dialogRef.close(this.data);
  }

  getLabel(group) {
    switch(group) {
      case 'property':
        return 'Propiedades';
      case 'tenant':
        return 'Inquilinos';
      case 'contract':
        return 'Contratos';
    }
  }

  getValue(item, group) {
    switch(group) {
      case 'property':
        return item.address;
      case 'tenant':
        return item.name;
      case 'contract':
        return `${item.propertyId} - ${item.tenantId}`;
    }
  }

  compareSelect(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }

}
