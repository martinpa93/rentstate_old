import { Component, OnDestroy, OnInit } from '@angular/core';
import { Property } from '../core/models/property';
import { PropertyService } from '../core/services/property.service';
import { MatDialog } from '@angular/material/dialog';
import { FilterPropertiesComponent } from './filter-properties/filter-properties.component';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  properties: Property[];
  propertiesPage: Property[];
  page = {
    pageIndex: 0,
    pageSize: 5
  };
  filter = {
    address: null, 
    type: null
  };
  sort: string;
  loadingR: boolean;

  constructor(
   private propertyS: PropertyService,
   private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadingR = true;
    this.propertyS.listProperties().subscribe((res: Property[]) => {
      this.properties = res;
      this.changeData();
      this.loadingR = false;
    });
    this.propertyS.addProperty(null, true).subscribe((res) => {
      this.loadingR = true;
      this.propertyS.listProperties(this.filter, this.sort).subscribe((res: Property[]) => {
        this.page.pageIndex = 0;
        this.properties = res;
        this.changeData();
        this.loadingR = false;
      });
    });
  }

  changePage(event) {
    this.page.pageIndex = event.pageIndex;
    this.page.pageSize = event.pageSize;
    this.changeData();
  }

  changeData() {
    if (!this.properties) { return; }
    this.propertiesPage = this.properties
      .filter((res: Property, index) => 
        index >= this.page.pageIndex * this.page.pageSize && index+1 <= (this.page.pageIndex+1) * this.page.pageSize
    );
  }

  openFilter() {
    const filter = { address: this.filter.address, type: this.filter.type }
    const dialogRef = this.dialog.open(FilterPropertiesComponent, { data: filter });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
        this.filter = result;
        this.filterData(this.filter);
      }
    }); 
  }

  filterData(filter) {
    this.propertyS.listProperties(filter).subscribe((res: Property[]) => {
      this.page.pageIndex = 0;
      this.properties = res;
      this.changeData();
    });
  }

  changeSort(sort) {
    this.sort = sort;
    this.propertyS.listProperties(null, sort).subscribe((res: Property[]) => {
      this.page.pageIndex = 0;
      this.properties = res;
      this.changeData();
    });
  }

  ngOnDestroy(): void {
  }

}
