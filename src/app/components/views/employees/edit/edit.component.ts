import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from 'src/app/interfaces/employees.interface';
import { EmployeesService } from 'src/app/services/employees.service';
import { MessagesService } from 'src/app/services/messages.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
   

  id:string = "";
 
  employee:IEmployee = {} as IEmployee;


  constructor(
    private activatedRoute: ActivatedRoute,
    private _employeeService: EmployeesService,
    private _messageService:MessagesService,
    private spinner: NgxSpinnerService,
    private router:Router
    
  ) {
    this.activatedRoute.params.subscribe(params => {
    this.id = params["id"];
    })
  }

  ngOnInit(): void {
    console.log(this.id)
  }

  editEmployee(employee:IEmployee) {
    
    Swal.fire({
      icon: 'question',
      title: 'Actualizar  empleado',
      html:'Estas seguro de actualizar el empleado',
      showCancelButton: true,
      confirmButtonText: 'OK',
      confirmButtonColor: '#44cb6c',
      background: '#c9daed',
    })
    .then((res) => {
      if (res.value) {
    debugger
    this._employeeService
      .editEmployee(this.id,employee)
      .then((res) => {
        console.log(res);
        this.spinner.hide();
        this._messageService.successMessage(
          'Empleado actualizado',
          'El empleado ha sido actualizado exitosamente'
        );
        this.router.navigate(['list'])
      })
      
      .catch((err) => {
        console.log(err);
        this.spinner.hide();
        this._messageService.errorMessage(
          'Error',
          'No fue posible actualizar al empleado',
          err.message
        );
      });
      
      
  }

 else{
  window.location.reload()
}
})





}
}