import { Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/core/services/contract.service';
import { PropertyService } from 'src/app/core/services/property.service';
import { TenantService } from 'src/app/core/services/tenant.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  note = {
    defaultDay: 'today',
    typeRel: null,
    relId: null,
    date: null,
    title: null,
    description: null
  };
  listRel;

  constructor(
    private propertyS: PropertyService,
    private tenantS: TenantService,
    private contractS: ContractService
  ) { }

  ngOnInit(): void {
  }

  changeTypeRel(typeRel: string) {
    this.note.relId = null;
    switch(typeRel) {
      case 'property':
        this.propertyS.listProperties().subscribe((res) => {
          this.listRel = res;
        });
        break;
      case 'tenant':
        this.tenantS.listTenants().subscribe((res) => {
          this.listRel = res;
        });
        break;
      case 'contract':
        this.contractS.listContracts().subscribe((res) => {
          this.listRel = res;
        });
        break;
    }
  }

  onSubmit() {}

}
