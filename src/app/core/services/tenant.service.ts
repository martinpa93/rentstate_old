import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  constructor(
    private electron: ElectronService
  ) { }
}
