import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IEmployee } from 'src/app/interfaces/employees.interface';
import { EmployeesService } from 'src/app/services/employees.service';
import { MessagesService } from 'src/app/services/messages.service';
import { EmployeesFormComponent } from '../../shared/utils/employees-form/employees-form.component';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit,AfterViewInit {
  text2:string = ""
  //  @ViewChild(EmployeesFormComponent) employee:EmployeesFormComponent;

  constructor(
    private _employeeService: EmployeesService,
    private _messageService: MessagesService,
    private spinner: NgxSpinnerService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // console.log('new',this.employee.text);
  }

  addEmployee(employee:IEmployee){
    this.spinner.show();
    this._employeeService.addEmployee(employee)
      .then(res => {
        this.spinner.hide();
        this._messageService.successMessage("Empleado agregado", "El empleado ha sido agregado exitosamente");
        this.router.navigate(['list'])
      })
      
      .catch(err => {
        this.spinner.hide();
        this._messageService.errorMessage("Error", "No fue posible agregar al empleado", err.message);
      })
  }
}