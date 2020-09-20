import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Tenant } from '../models/tenant';
import { ElectronService } from './electron.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  _tenants = new Subject();
  $tenants = this._tenants.asObservable();
  _tenant = new Subject();
  $tenant = this._tenant.asObservable();

  constructor(
    private userS: UserService,
    private electron: ElectronService,
  ) {
    this.electron.ipcRenderer.on('reply-list-tenants', (event, arg) => {
      this._tenants.next(arg);
    });
    this.electron.ipcRenderer.on('reply-add-tenant', (event, arg) => {
      this._tenant.next(arg);
    });
  }

  listTenants(filter?: {}, sort?: string): Observable<Tenant[]> {
    const data = {...filter, sort, userId: this.userS.get().id};
    this.electron.ipcRenderer.send('list-tenants', data);
    return this.$tenants.pipe(first(),map((tenants: Tenant[]) => {
      return tenants;
    }));
  }

  addTenant(tenant: Tenant, read: boolean): Observable<Tenant> {
    if (!read) {
      tenant.userId = this.userS.get().id;
      this.electron.ipcRenderer.send('add-tenant', tenant);
    }
    return this.$tenant.pipe(map((tenant: Tenant) => {
      return tenant[0];
    }));
  }
}
