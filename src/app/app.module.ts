import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { RegisterModule } from './components/register/register.module';
// import { LoginModule } from './components/login/login.module';
// import { FormdataComponent } from './components/formdata/formdata.component';

@NgModule({
  declarations: [
    AppComponent,
    // FormdataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // RegisterModule,
    // LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
