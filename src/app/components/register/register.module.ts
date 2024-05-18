import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register/register.component';
import { FormdataModule } from '../formdata/formdata.module';
import { FormsModule } from '@angular/forms'; // Import FormsModule


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormdataModule,
    FormsModule
  ]
})
export class RegisterModule { }
