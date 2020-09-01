import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';

@Injectable({
  providedIn: 'root'
})
export class AccountingService {

  constructor(
    private electron: ElectronService
  ) { }
}
