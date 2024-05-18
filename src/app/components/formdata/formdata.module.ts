import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormdataComponent } from './formdata/formdata.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [FormdataComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  // This is important 
  exports: [FormdataComponent]
})
export class FormdataModule { }
