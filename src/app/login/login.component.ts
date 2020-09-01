import { Component, OnDestroy, OnInit, NgZone } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { User } from '../core/models/user';
import { Router } from '@angular/router';
import { users } from 'src/assets/mocks/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  users: User[];
  selectedUser: User;
  $users = new Subscription();

  constructor(
    private userS: UserService,
    private router: Router,
    public zone: NgZone
  ) { }

  ngOnInit(): void {
    this.$users = this.userS.listUsers().subscribe((res: User[]) => {
      this.zone.run(() =>  this.users = res)
    });
  }
  
  changeSelection(user: User) {
    this.selectedUser = user;
  }
  
  onSubmit(): void {
    this.userS.set(this.selectedUser);
    this.router.navigateByUrl('/panel');
  }
  
  ngOnDestroy(): void {
  }
  
  clock() {
    console.log('clock context');
  }
  
}
