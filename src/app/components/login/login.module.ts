import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { FormdataModule } from '../formdata/formdata.module';
import { FormsModule } from '@angular/forms'; // Import FormsModule


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormdataModule,
    FormsModule
  ]
})
export class LoginModule { }
