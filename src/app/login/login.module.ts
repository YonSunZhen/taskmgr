import { NgModule } from '@angular/core';
import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule
  ]
})
export class LoginModule { }
