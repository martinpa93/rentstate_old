import { Component, OnInit } from '@angular/core';
import { Property } from '../core/models/property';
import { properties } from 'src/assets/mocks/properties';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PropertyService } from '../core/services/property.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  properties: Property[];

  constructor(
    private propertyS: PropertyService
  ) { }

  ngOnInit(): void {
    this.propertyS.listProperties().subscribe((res: Property[]) => {
      this.properties = res;
    });
  }

}
