import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Contract } from '../models/contract';
import { ElectronService } from './electron.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  _contracts = new Subject();
  $contracts = this._contracts.asObservable();
  _contract = new Subject();
  $contract = this._contract.asObservable();

  constructor(
    private userS: UserService,
    private electron: ElectronService
  ) {
    this.electron.ipcRenderer.on('reply-list-contracts', (event, arg) => {
      this._contracts.next(arg);
    });
    this.electron.ipcRenderer.on('reply-add-contract', (event, arg) => {
      this._contract.next(arg);
    });
  }
  
  listContracts(filter?: {}, sort?: string): Observable<Contract[]> {
    const data = {...filter, sort, userId: this.userS.get().id};
    this.electron.ipcRenderer.send('list-contracts', data);
    return this.$contracts.pipe(first(),map((contracts: Contract[]) => {
      contracts.map((element) => {
        element.duration = this.calculateDuration(element.start, element.end);
      });
      return contracts;
    }));
  }

  addContract(contract: Contract, read: boolean): Observable<Contract> {
    if (!read) {
      contract.userId = this.userS.get().id;
      this.electron.ipcRenderer.send('add-contract', contract);
    }
    return this.$contract.pipe(map((contract: Contract) => {
      return contract[0];
    }));
  }

  private calculateDuration(start, end) {
    const numyears = Math.floor(moment(end).diff(start, 'years'));
    let discountTime = moment(start).add(numyears, 'years');
    const nummonths = Math.floor(moment(end).diff(discountTime, 'months'));
    discountTime = moment(discountTime).add(nummonths, 'months');
    const numdays = Math.floor(moment(end).diff(discountTime, 'days'));

    let res = '';
    
    const yearStr = numyears === 1 ? 'año' : 'años'; 
    const monthStr = nummonths === 1 ? 'mes' : 'meses'; 
    const dayStr = numdays === 1 ? 'día' : 'dias'; 

    numyears ? res = `${numyears} ${yearStr}`: res; 
    nummonths ? res += ` ${nummonths} ${monthStr}` : res;
    numdays ? res += ` ${numdays} ${dayStr}` : res;
    return res;
  }
}
