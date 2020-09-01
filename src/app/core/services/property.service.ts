import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Property } from '../models/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  _property = new Subject();
  $property = this._property.asObservable();

  constructor(
    private electron: ElectronService
  ) {
    this.electron.ipcRenderer.on('reply-list-properties', (event, arg) => {
      this._property.next(arg);
    });
  }

  listProperties(): Observable<Property[]> {
    this.electron.ipcRenderer.send('list-properties');
    return this.$property.pipe(map((properties: Property[]) => {
      return properties;
    }));
  }
}
