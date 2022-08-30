import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { LimitStringPipe } from './pipes/limit-string.pipe';
import { EmployeesFormComponent } from './utils/employees-form/employees-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent,
    LimitStringPipe,
    EmployeesFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[
    EmployeesFormComponent,
    LimitStringPipe,
    NavbarComponent,
    
  ]
})
export class SharedModule { }
