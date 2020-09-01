import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { User } from '../models/user';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  _users = new Subject();
  $users = this._users.asObservable();

  constructor(
    private electron: ElectronService
  ) {
    this.electron.ipcRenderer.on('reply-list-users', (event, arg) => {
      this._users.next(arg);
    });
  }
  
  get() {
    return this.user;
  }

  set(user: User) {
    this.user = user;
  }

  listUsers(): Observable<User[]> {
    this.electron.ipcRenderer.send('list-users');
    return this.$users.pipe(map((users: User[]) => {
      return users;
    }));
  }

}
