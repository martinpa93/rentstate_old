import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private electron: ElectronService
  ) { }
}
