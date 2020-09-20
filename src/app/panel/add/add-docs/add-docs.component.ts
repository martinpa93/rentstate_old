import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FilesService } from 'src/app/core/services/files.service';
import { Subscription } from 'rxjs';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PropertyService } from 'src/app/core/services/property.service';
import { TenantService } from 'src/app/core/services/tenant.service';
import { ContractService } from 'src/app/core/services/contract.service';

@Component({
  selector: 'app-add-docs',
  templateUrl: './add-docs.component.html',
  styleUrls: ['./add-docs.component.scss']
})
export class AddDocsComponent implements OnInit, OnDestroy {
  @ViewChild(MatTable) table: MatTable<any>;
  filesToUpload = {
    typeRel: null,
    relId: null,
    data:[]
  };
  listRel;
  displayedColumns: string[] = ['name', 'type', 'size'];

  constructor(
    private fileS: FilesService,
    private propertyS: PropertyService,
    private tenantS: TenantService,
    private contractS: ContractService
  ) { }

  ngOnInit(): void {
  }

  changeTypeRel(typeRel: string) {
    console.log(typeRel);
    this.filesToUpload.relId = null;
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

  changeFiles(files: FileList) {
    for (let index = 0; index < files.length; index++) {
      const file: File = files[index];
      const myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        console.log(e);
        this.filesToUpload.data.push({
          name: file.name,
          type: file.type,
          file: e.target.result,
          status: e.target.readyState,
          size: e.total, 
          loaded: e.loaded
        });
        this.table.renderRows();
        //myReader.result is a String of the uploaded file
      }
      myReader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.fileS.uploadFiles(this.filesToUpload).subscribe((res) => { console.log(res) });
  }

  ngOnDestroy(): void {
  }
}
