import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
 import { FormdataComponent } from '../formdata/formdata.component';


@NgModule({
  declarations: [
    LoginComponent,
    FormdataComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
