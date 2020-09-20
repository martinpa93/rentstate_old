import { Component, OnInit } from '@angular/core';
import { Contract } from '../core/models/contract';
import { Subscription } from 'rxjs';
import { TenantService } from '../core/services/tenant.service';
import { MatDialog } from '@angular/material/dialog';
import { ContractService } from '../core/services/contract.service';
import { FilterContractsComponent } from './filter-contracts/filter-contracts.component';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {

  subscription: Subscription = new Subscription();
  contracts: Contract[];
  contractsPage: Contract[];
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
    private contractS: ContractService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadingR = true;
    this.contractS.listContracts().subscribe((res: Contract[]) => {
      this.contracts = res;
      this.changeData();
      this.loadingR = false;
    });
    this.subscription.add(this.contractS.addContract(null, true).subscribe((res) => {
      this.loadingR = true;
      this.contractS.listContracts(this.filter, this.sort).subscribe((res: Contract[]) => {
        this.page.pageIndex = 0;
        this.contracts = res;
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
    if (!this.contracts) { return; }
    this.contractsPage = this.contracts
      .filter((res: Contract, index) => 
        index >= this.page.pageIndex * this.page.pageSize && index+1 <= (this.page.pageIndex+1) * this.page.pageSize
    );
  }

  openFilter() {
    const filter = { name: this.filter.name, address: this.filter.address, type: this.filter.type }
    const dialogRef = this.dialog.open(FilterContractsComponent, { data: filter });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
        this.filter = result;
        this.filterData(this.filter, this.sort);
      }
    }); 
  }

  filterData(filter?, sort?) {
    this.contractS.listContracts(filter, sort).subscribe((res: Contract[]) => {
      this.page.pageIndex = 0;
      this.contracts = res;
      this.changeData();
    });
  }

  changeSort(filter, sort) {
    this.sort = sort;
    this.contractS.listContracts(filter, sort).subscribe((res: Contract[]) => {
      this.page.pageIndex = 0;
      this.contracts = res;
      this.changeData();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
