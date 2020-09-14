import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { Subject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Property } from '../models/property';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  _properties = new Subject();
  $properties = this._properties.asObservable();
  _property = new Subject();
  $property = this._property.asObservable();

  constructor(
    private userS: UserService,
    private electron: ElectronService
  ) {
    this.electron.ipcRenderer.on('reply-list-properties', (event, arg) => {
      this._properties.next(arg);
    });
    this.electron.ipcRenderer.on('reply-add-property', (event, arg) => {
      this._property.next(arg);
    });
  }
  
  listProperties(filter?: {}, sort?: string): Observable<Property[]> {
    const data = {...filter, sort, userId: this.userS.get().id};
    this.electron.ipcRenderer.send('list-properties', data);
    return this.$properties.pipe(first(),map((properties: Property[]) => {
      return properties;
    }));
  }

  addProperty(property: Property, read: boolean): Observable<Property> {
    if (!read) {
      property.userId = this.userS.get().id;
      this.electron.ipcRenderer.send('add-property', property);
    }
    return this.$property.pipe(map((property: Property) => {
      return property[0];
    }));
  }

  filterData
}