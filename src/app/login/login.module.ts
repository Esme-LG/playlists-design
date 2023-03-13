import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  exports: [
    LoginComponent
  ],
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LoginModule { }
