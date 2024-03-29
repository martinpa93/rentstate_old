import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Property } from '../core/models/property';
import { PropertyService } from '../core/services/property.service';
import { MatDialog } from '@angular/material/dialog';
import { FilterPropertiesComponent } from './filter-properties/filter-properties.component';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { ElectronService } from '../core/services/electron.service';

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
  loadingP: boolean;

  constructor(
   private propertyS: PropertyService,
   private dialog: MatDialog,
   private zone: NgZone
  ) { }

  ngOnInit(): void {
    
    this.loadingP = true;
    this.propertyS.listProperties().subscribe((res: Property[]) => {
      this.zone.run(() => {
        this.properties = res;
        this.changeData();
        this.loadingP = false;
      });
    });
    this.subscription.add(this.propertyS.addProperty(null, true).subscribe((res) => {
      this.loadingP = true;
      this.propertyS.listProperties(this.filter, this.sort).subscribe((res: Property[]) => {
        this.zone.run(() => {
          this.page.pageIndex = 0;
          this.properties = res;
          this.changeData();
          this.loadingP = false;
        });
      });
    }));
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
        this.filterData(this.filter, this.sort);
      }
    }); 
  }

  filterData(filter?, sort?) {
    this.propertyS.listProperties(filter, sort).subscribe((res: Property[]) => {
      this.page.pageIndex = 0;
      this.properties = res;
      this.changeData();
    });
  }

  changeSort(filter, sort) {
    this.sort = sort;
    this.propertyS.listProperties(filter, sort).subscribe((res: Property[]) => {
      this.page.pageIndex = 0;
      this.properties = res;
      this.changeData();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
