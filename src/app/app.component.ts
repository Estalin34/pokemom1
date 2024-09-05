import { register } from 'module';
import { RegisterService } from './services/user/register/register.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import{NzAvatarModule} from 'ng-zorro-antd/avatar';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import { UsersService } from './services/user/user.service';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import {Register} from './services/user/register/register.service'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule,NzBreadCrumbModule,NzAvatarModule,NzFlexModule,NzToolTipModule,NzDropDownModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isCollapsed = false;
  register?:Register;
  
  constructor(private usersService: UsersService,private registerService:RegisterService ) { }
  ngOnInit(): void {
    this.getRegister();
  }
  getRegister(): void {
     this.registerService
     .getRegister
     (this.usersService.getCurrentUser()!.uid)
     .subscribe((r)=> this.register = r);
  }



  isLogged(): boolean {
    return this.usersService.getCurrentUser() != null;
  }
  onClickLogout(){
    this.usersService.logout();
  }
}
