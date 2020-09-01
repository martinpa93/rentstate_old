import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectronService } from './services/electron.service';
import { UserService } from './services/user.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ElectronService,
    UserService
  ]
})
export class CoreModule { }
